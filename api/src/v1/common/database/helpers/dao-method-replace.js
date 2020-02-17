const daoMethodReplace = async (dao, sourceId, targetIds, names, options) => {
  const sourceTarget = await dao.get({ [names.source]: sourceId }, options);
  const sourceTargetIds = sourceTarget.map(st => st[names.target]);

  const forDelete = sourceTargetIds.filter(id => !targetIds.includes(id));
  const forCreate = targetIds.filter(id => !sourceTargetIds.includes(id));

  await Promise.all(
    forDelete.map(id => dao.delete({ [names.source]: sourceId, [names.target]: id }, options)),
  );
  await Promise.all(
    forCreate.map(id => dao.create({ [names.source]: sourceId, [names.target]: id }, options)),
  );

  return true;
};

export default daoMethodReplace;
