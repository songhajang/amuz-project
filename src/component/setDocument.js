import { collection, setDoc, doc, getDoc } from "firebase/firestore";
await setDoc(doc(data, "post", "ko")),
  {
    postTItle: "test입니다.",
    postId: 1,
    postDate: "2022-11-28",
  };
