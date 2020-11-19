import db from '../db';
import { FacilityAliasModel } from '../models';

// makes alias like this: A, B, C, ..., Y, Z, AA, AB, ..., ZY, ZZ, AAA, AAB, ..., ZZY, ZZZ
export const makeAliasFromIndex = (index: number): string => {
  if (index > 26 * 26 * 26 + 25) throw 'Maximum index reached. Consider expanding to 4 letter aliases.';

  const firstLetterIndex = index >= 26 * 26 + 26 ? (Math.floor(index / (26 * 26)) - 1) % 26 : null;
  const secondLetterIndex = index >= 26 ? (Math.floor(index / 26) - 1) % 26 : null;
  const thirdLetterIndex = Math.floor(index % 26);

  const firstLetter = firstLetterIndex !== null ? String.fromCharCode(65 + firstLetterIndex) : '';
  const secondLetter = secondLetterIndex !== null ? String.fromCharCode(65 + secondLetterIndex) : '';
  const thirdLetter = String.fromCharCode(65 + thirdLetterIndex);

  return firstLetter + secondLetter + thirdLetter;
};

export const makeFacilityAlias = async (facility: string): Promise<void> => {
  db.connect();

  const previousIndex = (await FacilityAliasModel.find().then((aliases) => {
    const aliasIndexes = aliases.map((alias) => alias.index);
    return Math.max(...aliasIndexes);
  })) as number;

  if (!previousIndex && previousIndex !== 0) throw 'Previous index not found';

  // prevousIndex === -Infinity if the alias collection is empty
  const index = previousIndex === -Infinity ? 0 : previousIndex + 1;
  const alias = makeAliasFromIndex(index);

  const newAlias = new FacilityAliasModel({
    facility,
    alias,
    index,
  });

  newAlias.save().catch(() => {
    throw 'unable to save alias';
  });
};
