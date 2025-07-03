export async function termExplainCtrl(req, res) {
  const { term } = req.query;
  // 实际可调用AI服务或查数据库
  res.json({ explain: `"${term}"是一个重要的科研术语，其含义为：……（此处为示例弹幕内容）` });
} 