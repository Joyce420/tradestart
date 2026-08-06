begin;

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '' check (char_length(display_name) <= 80),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user' check (role in ('user', 'editor', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', ''));

  insert into public.user_roles (user_id, role)
  values (new.id, 'user');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.is_staff(required_roles text[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = (select auth.uid())
      and role = any(required_roles)
  );
$$;

create table public.diagnostic_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  answers_json jsonb not null default '{}'::jsonb,
  result_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index diagnostic_results_user_created_idx
  on public.diagnostic_results (user_id, created_at desc);

create table public.learning_paths (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  target_type text not null default 'beginner' check (char_length(target_type) <= 50),
  description text not null default '' check (char_length(description) <= 1000),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.modules (
  id uuid primary key default gen_random_uuid(),
  path_id uuid not null references public.learning_paths(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 120),
  description text not null default '' check (char_length(description) <= 1000),
  sort_order smallint not null check (sort_order between 1 and 100),
  estimated_minutes integer not null default 10 check (estimated_minutes between 1 and 600),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (path_id, sort_order)
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 160),
  content_json jsonb not null default '{}'::jsonb,
  difficulty text not null default 'beginner' check (difficulty in ('beginner', 'intermediate', 'advanced')),
  sort_order smallint not null default 1 check (sort_order between 1 and 100),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (module_id, sort_order)
);

create table public.quizzes (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  question text not null check (char_length(question) between 1 and 1000),
  options_json jsonb not null check (jsonb_typeof(options_json) = 'array'),
  sort_order smallint not null default 1 check (sort_order between 1 and 100),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (lesson_id, sort_order)
);

create table public.quiz_answer_keys (
  quiz_id uuid primary key references public.quizzes(id) on delete cascade,
  answer_json jsonb not null,
  explanation text not null default '' check (char_length(explanation) <= 2000),
  updated_at timestamptz not null default now()
);

create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  answers_json jsonb not null default '{}'::jsonb,
  score numeric(5,2) not null default 0 check (score between 0 and 100),
  submitted_at timestamptz not null default now()
);

create index quiz_attempts_user_lesson_idx
  on public.quiz_attempts (user_id, lesson_id, submitted_at desc);

create table public.user_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id uuid not null references public.modules(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete cascade,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  score numeric(5,2) check (score between 0 and 100),
  task_json jsonb not null default '{}'::jsonb,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, module_id)
);

create table public.glossary_terms (
  id uuid primary key default gen_random_uuid(),
  cn_name text not null check (char_length(cn_name) between 1 and 120),
  en_name text not null default '' check (char_length(en_name) <= 160),
  abbreviation text not null default '' check (char_length(abbreviation) <= 30),
  definition text not null check (char_length(definition) between 1 and 2000),
  example text not null default '' check (char_length(example) <= 3000),
  related_terms_json jsonb not null default '[]'::jsonb check (jsonb_typeof(related_terms_json) = 'array'),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index glossary_terms_abbreviation_unique
  on public.glossary_terms (lower(abbreviation))
  where abbreviation <> '';

create table public.calculations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id uuid not null default gen_random_uuid(),
  name text not null default '未命名计算' check (char_length(name) between 1 and 100),
  currency text not null default 'USD' check (currency in ('USD', 'CNY')),
  input_json jsonb not null default '{}'::jsonb,
  result_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, client_id)
);

create index calculations_user_updated_idx
  on public.calculations (user_id, updated_at desc);

create table public.challenge_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id uuid not null default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 160),
  product_name text not null default '' check (char_length(product_name) <= 160),
  market text not null default '' check (char_length(market) <= 160),
  status text not null default 'draft' check (status in ('draft', 'active', 'completed', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, client_id)
);

create index challenge_projects_user_updated_idx
  on public.challenge_projects (user_id, updated_at desc);

create table public.challenge_tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.challenge_projects(id) on delete cascade,
  day_number smallint not null check (day_number between 1 and 7),
  content_json jsonb not null default '{}'::jsonb,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, day_number)
);

create table public.project_competitors (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.challenge_projects(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 160),
  platform text not null default '' check (char_length(platform) <= 120),
  price_minor bigint not null default 0 check (price_minor >= 0),
  currency text not null default 'USD' check (currency in ('USD', 'CNY')),
  pros text not null default '' check (char_length(pros) <= 3000),
  cons text not null default '' check (char_length(cons) <= 3000),
  differentiation text not null default '' check (char_length(differentiation) <= 3000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 200),
  category text not null default 'general' check (char_length(category) <= 80),
  content_json jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  page text not null check (char_length(page) between 1 and 200),
  type text not null default 'general' check (char_length(type) <= 50),
  content text not null check (char_length(content) between 1 and 5000),
  status text not null default 'new' check (status in ('new', 'reviewing', 'resolved')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_name text not null check (event_name in (
    'home_view', 'diagnostic_start', 'diagnostic_complete', 'path_view',
    'lesson_start', 'lesson_complete', 'calculator_start', 'calculator_complete',
    'calculation_save', 'challenge_start', 'challenge_task_complete',
    'project_complete', 'project_share', 'feedback_submit'
  )),
  properties_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index analytics_events_name_created_idx
  on public.analytics_events (event_name, created_at desc);

create or replace function public.user_owns_project(target_project_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.challenge_projects
    where id = target_project_id
      and user_id = (select auth.uid())
  );
$$;

create trigger profiles_set_updated_at before update on public.profiles
  for each row execute procedure public.set_updated_at();
create trigger user_roles_set_updated_at before update on public.user_roles
  for each row execute procedure public.set_updated_at();
create trigger learning_paths_set_updated_at before update on public.learning_paths
  for each row execute procedure public.set_updated_at();
create trigger modules_set_updated_at before update on public.modules
  for each row execute procedure public.set_updated_at();
create trigger lessons_set_updated_at before update on public.lessons
  for each row execute procedure public.set_updated_at();
create trigger quizzes_set_updated_at before update on public.quizzes
  for each row execute procedure public.set_updated_at();
create trigger quiz_answer_keys_set_updated_at before update on public.quiz_answer_keys
  for each row execute procedure public.set_updated_at();
create trigger user_progress_set_updated_at before update on public.user_progress
  for each row execute procedure public.set_updated_at();
create trigger glossary_terms_set_updated_at before update on public.glossary_terms
  for each row execute procedure public.set_updated_at();
create trigger calculations_set_updated_at before update on public.calculations
  for each row execute procedure public.set_updated_at();
create trigger challenge_projects_set_updated_at before update on public.challenge_projects
  for each row execute procedure public.set_updated_at();
create trigger challenge_tasks_set_updated_at before update on public.challenge_tasks
  for each row execute procedure public.set_updated_at();
create trigger project_competitors_set_updated_at before update on public.project_competitors
  for each row execute procedure public.set_updated_at();
create trigger articles_set_updated_at before update on public.articles
  for each row execute procedure public.set_updated_at();
create trigger feedback_set_updated_at before update on public.feedback
  for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.diagnostic_results enable row level security;
alter table public.learning_paths enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_answer_keys enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.user_progress enable row level security;
alter table public.glossary_terms enable row level security;
alter table public.calculations enable row level security;
alter table public.challenge_projects enable row level security;
alter table public.challenge_tasks enable row level security;
alter table public.project_competitors enable row level security;
alter table public.articles enable row level security;
alter table public.feedback enable row level security;
alter table public.analytics_events enable row level security;

create policy profiles_select_own on public.profiles for select to authenticated
  using ((select auth.uid()) = id or public.is_staff(array['admin']));
create policy profiles_update_own on public.profiles for update to authenticated
  using ((select auth.uid()) = id or public.is_staff(array['admin']))
  with check ((select auth.uid()) = id or public.is_staff(array['admin']));

create policy user_roles_select_own on public.user_roles for select to authenticated
  using ((select auth.uid()) = user_id or public.is_staff(array['admin']));
create policy user_roles_admin_insert on public.user_roles for insert to authenticated
  with check (public.is_staff(array['admin']));
create policy user_roles_admin_update on public.user_roles for update to authenticated
  using (public.is_staff(array['admin'])) with check (public.is_staff(array['admin']));
create policy user_roles_admin_delete on public.user_roles for delete to authenticated
  using (public.is_staff(array['admin']));

create policy diagnostic_results_own on public.diagnostic_results for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy learning_paths_public_read on public.learning_paths for select to anon, authenticated
  using (status = 'published' or public.is_staff(array['editor', 'admin']));
create policy learning_paths_staff_write on public.learning_paths for all to authenticated
  using (public.is_staff(array['editor', 'admin']))
  with check (public.is_staff(array['editor', 'admin']));

create policy modules_public_read on public.modules for select to anon, authenticated
  using (
    (status = 'published' and exists (
      select 1 from public.learning_paths p where p.id = path_id and p.status = 'published'
    )) or public.is_staff(array['editor', 'admin'])
  );
create policy modules_staff_write on public.modules for all to authenticated
  using (public.is_staff(array['editor', 'admin']))
  with check (public.is_staff(array['editor', 'admin']));

create policy lessons_public_read on public.lessons for select to anon, authenticated
  using (
    (status = 'published' and exists (
      select 1 from public.modules m
      join public.learning_paths p on p.id = m.path_id
      where m.id = module_id and m.status = 'published' and p.status = 'published'
    )) or public.is_staff(array['editor', 'admin'])
  );
create policy lessons_staff_write on public.lessons for all to authenticated
  using (public.is_staff(array['editor', 'admin']))
  with check (public.is_staff(array['editor', 'admin']));

create policy quizzes_public_read on public.quizzes for select to anon, authenticated
  using (
    (status = 'published' and exists (
      select 1 from public.lessons l where l.id = lesson_id and l.status = 'published'
    )) or public.is_staff(array['editor', 'admin'])
  );
create policy quizzes_staff_write on public.quizzes for all to authenticated
  using (public.is_staff(array['editor', 'admin']))
  with check (public.is_staff(array['editor', 'admin']));

create policy quiz_answer_keys_staff_only on public.quiz_answer_keys for all to authenticated
  using (public.is_staff(array['editor', 'admin']))
  with check (public.is_staff(array['editor', 'admin']));

create policy quiz_attempts_own on public.quiz_attempts for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy user_progress_own on public.user_progress for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy glossary_public_read on public.glossary_terms for select to anon, authenticated
  using (status = 'published' or public.is_staff(array['editor', 'admin']));
create policy glossary_staff_write on public.glossary_terms for all to authenticated
  using (public.is_staff(array['editor', 'admin']))
  with check (public.is_staff(array['editor', 'admin']));

create policy calculations_own on public.calculations for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy challenge_projects_own on public.challenge_projects for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy challenge_tasks_own on public.challenge_tasks for all to authenticated
  using (public.user_owns_project(project_id))
  with check (public.user_owns_project(project_id));

create policy project_competitors_own on public.project_competitors for all to authenticated
  using (public.user_owns_project(project_id))
  with check (public.user_owns_project(project_id));

create policy articles_public_read on public.articles for select to anon, authenticated
  using (status = 'published' or public.is_staff(array['editor', 'admin']));
create policy articles_staff_write on public.articles for all to authenticated
  using (public.is_staff(array['editor', 'admin']))
  with check (public.is_staff(array['editor', 'admin']));

create policy feedback_insert_own on public.feedback for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy feedback_select_own_or_staff on public.feedback for select to authenticated
  using ((select auth.uid()) = user_id or public.is_staff(array['editor', 'admin']));
create policy feedback_staff_update on public.feedback for update to authenticated
  using (public.is_staff(array['editor', 'admin']))
  with check (public.is_staff(array['editor', 'admin']));

create policy analytics_insert_own on public.analytics_events for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy analytics_admin_read on public.analytics_events for select to authenticated
  using (public.is_staff(array['admin']));

grant usage on schema public to anon, authenticated;
grant select on public.learning_paths, public.modules, public.lessons, public.quizzes,
  public.glossary_terms, public.articles to anon, authenticated;
grant select on public.profiles to authenticated;
grant update (display_name) on public.profiles to authenticated;
grant select on public.user_roles to authenticated;
grant select, insert, update, delete on public.diagnostic_results, public.quiz_attempts,
  public.user_progress, public.calculations, public.challenge_projects,
  public.challenge_tasks, public.project_competitors, public.feedback,
  public.analytics_events to authenticated;
grant select, insert, update, delete on public.quiz_answer_keys to authenticated;
grant insert, update, delete on public.learning_paths, public.modules, public.lessons,
  public.quizzes, public.glossary_terms, public.articles to authenticated;
grant execute on function public.is_staff(text[]) to anon, authenticated;
grant execute on function public.user_owns_project(uuid) to authenticated;

commit;
