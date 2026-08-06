begin;

insert into public.learning_paths (id, name, target_type, description, status)
values (
  '10000000-0000-4000-8000-000000000001',
  '外贸全流程入门路线',
  'beginner',
  '从业务模式、选品和市场研究开始，完成一份模拟出口方案。',
  'published'
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  status = excluded.status;

insert into public.modules (id, path_id, title, description, sort_order, estimated_minutes, status)
values
  ('20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', '选择业务模式', '理解 B2B、B2C 与适用场景。', 1, 12, 'published'),
  ('20000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000001', '选择商品与供应商', '用 MOQ、利润空间和供应稳定性筛选商品。', 2, 15, 'published'),
  ('20000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000001', '研究目标市场', '确定目标国家、客户和基础需求。', 3, 15, 'published'),
  ('20000000-0000-4000-8000-000000000004', '10000000-0000-4000-8000-000000000001', '选择获客与销售渠道', '比较平台、独立站和主动开发。', 4, 15, 'published'),
  ('20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000000001', '核算价格与利润', '把采购、物流、平台、支付与售后成本算清楚。', 5, 20, 'published'),
  ('20000000-0000-4000-8000-000000000006', '10000000-0000-4000-8000-000000000001', '收款、物流与报关', '理解常见物流、收款和报关节点。', 6, 20, 'published'),
  ('20000000-0000-4000-8000-000000000007', '10000000-0000-4000-8000-000000000001', '客户沟通与订单履约', '整理询盘、报价、确认与交付流程。', 7, 18, 'published'),
  ('20000000-0000-4000-8000-000000000008', '10000000-0000-4000-8000-000000000001', '售后、复盘与规模化', '处理售后风险并形成复盘清单。', 8, 15, 'published')
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  estimated_minutes = excluded.estimated_minutes,
  status = excluded.status;

insert into public.lessons (id, module_id, title, content_json, difficulty, sort_order, status, published_at)
values
  ('30000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'B2B 与 B2C 模式怎么选', '{"goal":"根据商品、资金和能力选择首个业务模式","key_points":["B2B 通常客单量较大、成交周期较长","B2C 更依赖零售运营、内容和履约","先选择一种主模式完成验证"]}', 'beginner', 1, 'published', now()),
  ('30000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000002', '商品与供应商筛选', '{"goal":"建立初步供应商清单","key_points":["关注利润空间和体积重量比","确认 MOQ、OEM 与 ODM 条件","样品与阶梯报价不能省略"]}', 'beginner', 1, 'published', now()),
  ('30000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', '海外市场调研基础', '{"goal":"形成目标市场和客户假设","key_points":["先看需求而不是只看人口","区分消费者与采购决策者","记录信息来源与更新时间"]}', 'beginner', 1, 'published', now()),
  ('30000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000004', '获客渠道选择', '{"goal":"选择首个低成本获客渠道","key_points":["B2B 平台适合采购需求","主动开发需要客户名单与持续跟进","独立站不等于自动获得流量"]}', 'beginner', 1, 'published', now()),
  ('30000000-0000-4000-8000-000000000005', '20000000-0000-4000-8000-000000000005', '外贸报价与利润', '{"goal":"完成包含主要成本的利润测算","key_points":["售价减采购价不是净利润","计入物流、佣金、支付、广告和售后","低价商品优先考虑组合装或批量销售"]}', 'beginner', 1, 'published', now()),
  ('30000000-0000-4000-8000-000000000006', '20000000-0000-4000-8000-000000000006', '物流、收款与报关概览', '{"goal":"画出订单资金与货物流向","key_points":["物流方案需要确认时效、计费重和商品属性","不同贸易术语划分责任不同","实际关务与税务结论需咨询专业机构"]}', 'beginner', 1, 'published', now()),
  ('30000000-0000-4000-8000-000000000007', '20000000-0000-4000-8000-000000000007', '从询盘到履约', '{"goal":"整理一次模拟订单的沟通步骤","key_points":["先确认规格、数量和目的地","报价需写清有效期与贸易术语","订单变更必须留存书面记录"]}', 'beginner', 1, 'published', now()),
  ('30000000-0000-4000-8000-000000000008', '20000000-0000-4000-8000-000000000008', '售后与项目复盘', '{"goal":"形成风险与改进清单","key_points":["记录退款、破损和延误原因","按成本、渠道和客户分组复盘","先修复高频问题再扩大投入"]}', 'beginner', 1, 'published', now())
on conflict (id) do update set
  title = excluded.title,
  content_json = excluded.content_json,
  status = excluded.status,
  published_at = excluded.published_at;

insert into public.quizzes (id, lesson_id, question, options_json, sort_order, status)
values
  ('40000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000002', 'MOQ 指什么？', '[{"id":"min","label":"最小起订量"},{"id":"price","label":"最低售价"}]', 1, 'published'),
  ('40000000-0000-4000-8000-000000000002', '30000000-0000-4000-8000-000000000002', 'OEM 的核心含义是什么？', '[{"id":"factory","label":"按品牌方要求代工生产"},{"id":"shipping","label":"国际运输服务"}]', 2, 'published'),
  ('40000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000002', '选品时什么会直接影响国际运费？', '[{"id":"weight","label":"体积与重量"},{"id":"color","label":"商品颜色"}]', 3, 'published')
on conflict (id) do update set
  question = excluded.question,
  options_json = excluded.options_json,
  status = excluded.status;

insert into public.quiz_answer_keys (quiz_id, answer_json, explanation)
values
  ('40000000-0000-4000-8000-000000000001', '{"option_id":"min"}', 'MOQ 是供应商接受订单的最小数量。'),
  ('40000000-0000-4000-8000-000000000002', '{"option_id":"factory"}', 'OEM 通常指供应商按照品牌方要求进行代工生产。'),
  ('40000000-0000-4000-8000-000000000003', '{"option_id":"weight"}', '国际物流常按实际重量或体积重量计费。')
on conflict (quiz_id) do update set
  answer_json = excluded.answer_json,
  explanation = excluded.explanation;

insert into public.glossary_terms (cn_name, en_name, abbreviation, definition, example, related_terms_json, status)
values
  ('最小起订量', 'Minimum Order Quantity', 'MOQ', '供应商接受单次订单的最低数量。', 'MOQ 500 件表示通常至少采购 500 件。', '["OEM","ODM"]', 'published'),
  ('船上交货', 'Free On Board', 'FOB', '卖方按约定将货物装上指定船舶后完成主要交货义务的贸易术语。', '报价为 FOB 深圳时需进一步确认港口和费用边界。', '["CIF","EXW"]', 'published'),
  ('成本加保险费加运费', 'Cost Insurance and Freight', 'CIF', '卖方承担将货物运至指定目的港的成本和保险，但风险转移点需按规则确认。', 'CIF Hamburg 报价应写明目的港。', '["FOB"]', 'published'),
  ('工厂交货', 'Ex Works', 'EXW', '卖方通常在自身场所提供货物，买方承担后续提货与运输安排。', 'EXW 报价不等同于货物已送到港口。', '["FOB"]', 'published'),
  ('完税后交货', 'Delivered Duty Paid', 'DDP', '卖方承担较多运输和进口环节责任的贸易术语，实际使用前应确认当地合规能力。', 'DDP 价格通常需要包含更多物流和税费预估。', '["FOB","CIF"]', 'published'),
  ('海关编码', 'Harmonized System Code', 'HS Code', '用于商品归类和关务处理的编码体系。', '同类产品可能因材质或用途不同而使用不同编码。', '["清关","报关"]', 'published'),
  ('企业对企业', 'Business to Business', 'B2B', '企业向其他企业销售商品或服务的业务模式。', '向海外批发商销售 500 件产品属于典型 B2B 场景。', '["B2C"]', 'published'),
  ('企业对消费者', 'Business to Consumer', 'B2C', '企业直接向最终消费者销售商品或服务的业务模式。', '通过跨境平台向个人消费者销售属于 B2C。', '["B2B"]', 'published'),
  ('原始设备制造', 'Original Equipment Manufacturer', 'OEM', '供应商按照客户要求进行代工生产。', '客户提供品牌和规格，工厂负责生产。', '["ODM","MOQ"]', 'published'),
  ('原始设计制造', 'Original Design Manufacturer', 'ODM', '供应商提供已有设计方案并为客户生产或定制。', '客户从工厂现有方案中选择并调整外观。', '["OEM","MOQ"]', 'published')
on conflict do nothing;

commit;
