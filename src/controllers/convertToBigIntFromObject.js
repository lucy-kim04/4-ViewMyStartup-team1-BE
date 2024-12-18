/**
 * express에서 bigint를 처리하기 위한 함수
 * - 데이터 중 bigint인 것을 toString()한 후 Number로 변경
 * - 전체를 JSON.stringify한 후 다시 JSON.parse해 줌
 */

export function convertToBigIntFromObject(obj) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      return typeof value === 'bigint' ? Number(value.toString()) : value;
    })
  );
}
