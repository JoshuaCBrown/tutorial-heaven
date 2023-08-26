import { catStructure } from "./Categories";

let childObjectArray = [];
let childIdArray = [];
let gcIdArray = [];
let newObjArray = [];

function arrayLevelsTwo(pArr) {
  let childObjectArr = [];
  const newArr = pArr.map((obj) => {
    if (obj.children) {
      const childObj = obj.children;
      childObj.map((item) => {
        childObjectArr.push(item);
      });
    }
  });
  return childObjectArr;
}

function arrayLevels(pArr) {
  let childObjectArr = [];
  for (let i = 0; i < pArr.length; ++i) {
    if (pArr[i].children) {
      childObjectArr.push(pArr[i].children);
    }
  }
  return childObjectArr;
}

function idArrayLevels(objArr) {
  let idArr = [];
  let idOrganizer = objArr.map((obj) => {
    idArr.push(obj.id);
  });
  return idArr;
}

export function categoryArrayizer() {
  let pIdArr = idArrayLevels(catStructure);
  console.log(pIdArr);
  const cObjArr = arrayLevelsTwo(catStructure);
  let cIdArr = idArrayLevels(cObjArr);
  console.log(cIdArr);
  const gcObjArr = arrayLevelsTwo(cObjArr);
  const gcIdArr = idArrayLevels(gcObjArr);
  console.log(gcIdArr);
  const ggcObjArr = arrayLevelsTwo(gcObjArr);
  const ggcIdArr = idArrayLevels(ggcObjArr);
  console.log(ggcIdArr);
  return {
    parent: pIdArr,
    child: cIdArr,
    grandchild: gcIdArr,
    greatgrandchild: ggcIdArr,
  };
}
