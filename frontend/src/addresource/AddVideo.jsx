import { useState } from "react";
import { catStructure } from "../home/Categories";
import DropDownLogic from "./DropDownLogic";

export default function AddVideo() {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [childCategory, setChildCategory] = useState("");
  const [grandChildCategory, setGrandChildCategory] = useState("");
  const [greatGrandChildCategory, setGreatGrandChildCategory] = useState("");
  const [parentObj, setParentObj] = useState("");
  const [childObj, setChildObj] = useState("");
  const [grandChildObj, setGrandChildObj] = useState("");
  const [greatGrandChildObj, setGreatGrandChildObj] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    const video = {
      link,
      title,
      description,
      tags,
      category,
      childCategory,
      grandChildCategory,
      greatGrandChildCategory,
    };
    console.log(video);
  }

  function findId(arr, idVal) {
    for (const obj of arr) {
      if (obj.id === idVal) {
        return obj;
      }
      if (obj.children) {
        const recursivize = findId(obj.children, idVal);
        if (recursivize) {
          return recursivize;
        }
      }
    }
  }

  function selectCatHandler(e, level) {
    const index = e.target.selectedIndex;
    const selection = e.target.childNodes[index];
    const selectedId = selection.getAttribute("id");
    const numId = parseFloat(selectedId);
    const selectedObj = findId(catStructure, numId);
    // const selectedObj = catStructure.find((element) => element.id === numId);
    console.log(selectedObj);

    if (level === 1) {
      setCategory(e.target.value);
      setParentObj(selectedObj);
    } else if (level === 2) {
      setChildCategory(e.target.value);
      setChildObj(selectedObj);
    } else if (level === 3) {
      setGrandChildCategory(e.target.value);
      setGrandChildObj(selectedObj);
    } else if (level === 4) {
      setGreatGrandChildCategory(e.target.value);
      setGreatGrandChildObj(selectedObj);
    } else {
      console.log("error with setting proper level");
    }
  }

  return (
    <form>
      <label>
        Link (YouTube or Vimeo only):
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </label>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Brief description (optional):
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Tags (separated by comma or whitespace):
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </label>
      <DropDownLogic
        label={"Category: "}
        data={catStructure}
        selectHandler={selectCatHandler}
        name={"category"}
        id={"categorySelector"}
        value={category}
        level={1}
      />
      {parentObj && parentObj.children && (
        <DropDownLogic
          label={"Sub-Category: "}
          data={parentObj.children}
          selectHandler={selectCatHandler}
          name={"subCategory"}
          id={"subCategorySelector"}
          value={childCategory}
          level={2}
        />
      )}
      {childObj && childObj.children && (
        <DropDownLogic
          label={"Sub-Sub-Category: "}
          data={childObj.children}
          selectHandler={selectCatHandler}
          name={"subSubCategory"}
          id={"subSubCategorySelector"}
          value={grandChildCategory}
          level={3}
        />
      )}
      {grandChildObj && grandChildObj.children && (
        <DropDownLogic
          label={"Sub-Sub-Sub-Category: "}
          data={GreatGrandChildObj.children}
          selectHandler={selectCatHandler}
          name={"subSubSubCategory"}
          id={"subSubSubCategorySelector"}
          value={greatGrandChildCategory}
          level={4}
        />
      )}
      <input type="submit" onClick={submitHandler} />
    </form>
  );
}
