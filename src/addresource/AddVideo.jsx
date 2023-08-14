import { useState } from "react";
import { catStructure } from "../home/Categories";
import DropDownLogic from "./DropDownLogic";

export default function AddVideo() {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [parentCat, setParentCat] = useState("");
  const [ChildCategory, setChildCategory] = useState("");
  const [grandChildCategory, setGrandChildCategory] = useState("");
  const [greatGrandChildCategory, setGreatGrandChildCategory] = useState("");
  function clickHandler() {
    //donothing for now
  }

  function selectCatHandler(level, e) {
    setCategory(e.target.value);
    const index = e.target.selectedIndex;
    const selection = e.target.childNodes[index];
    const selectedId = selection.getAttribute("id");
    const numId = parseFloat(selectedId);
    const selectedObj = catStructure.find((element) => element.id === numId);
    console.log(selectedObj);
    if (level === 1) {
        setParentCat(selectedObj);
    } else if (level === 2) {
        setChildCategory(selectedObj);
    } else if (level === 3) {
        setGrandChildCategory(selectedObj);
    } else if (level === 4) {
        setGreatGrandChildCategory(selectedObj);
    } else {
        console.log('error with setting proper level');
    };
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
        data={catStructure}
        selectHandler={selectCatHandler}
        name={"category"}
        id={"categorySelector"}
        value={category}
        level={1}
      />
      {parentCat && parentCat.children && (
        <DropDownLogic
          data={parentCat.children}
          selectHandler={selectHandler}
          name={"subCategory"}
          id={"subCategorySelector"}
          value={subCategory}
          level={2}
        />
      )}
      <input type="submit" onClick={clickHandler} />
    </form>
  );
}
