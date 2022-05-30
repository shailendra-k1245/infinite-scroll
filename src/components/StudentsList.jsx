import axios from "axios";
import { useEffect, useState, useRef } from "react";

export const StudentsList = () => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(25);
  const [data, setData] = useState([]);
  const listInnerRef = useRef();

  useEffect(() => {
    getData();
  }, [page]);

  const getData = () => {
    axios
      .get(`http://localhost:8080/students?_page=${page}&_limit=${count}`)
      .then((res) => {
        if (data.length === 0) {
          setData(res.data);
        } else {
          data.push(...res.data);
          setData(data);
        }
      });
  };

  const handleClick = () => {
    setPage((prev) => prev + 1);
    // getData()
  };

  const handleScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight >= scrollHeight * 0.98) {
        console.log("reached bottom");
        handleClick();
      }
    }
  };

  return (
    <>
      <h1>This is list component</h1>
      <button onClick={handleClick}>Add Next 25</button>
      <div className="overFlow" onScroll={handleScroll} ref={listInnerRef}>
        {data.map((el) => (
          <h1 key={el.name}>{el.name}</h1>
        ))}
      </div>
    </>
  );
};
