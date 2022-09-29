import { CircularProgress, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { getBoard, updateBoard } from "../../service/roadmaps";
import { Roadmap } from "../../types/roadmap";
import { BoardArea } from "./BoardArea/BoardArea";
import { Document, Page } from "react-pdf";
import "./Roadmap.css";
import { ViewPdf } from "../Tasks/ViewPdf/ViewPdf";
import { sampleTasks } from "../../service/sampleTasks";

export const RoadmapComponent = (props) => {
  let { id } = useParams<{ id: string }>();

  const history = useHistory();
  var str = history.location.pathname.substring(1, history.location.pathname.length);
  var n = str.indexOf("/") + 1;
  // const [board, setBoard] = useState<Roadmap | undefined>(undefined);
  // const [board, setBoard] = useState({
  //   author: "Jinjun Xiong",
  //   levels: "3",
  //   name: "Deep Learning Evolution",
  //   public: true,
  //   rating: 3,
  //   tags: ["basics", "deep learning"],
  //   uid: "e6c46d7bdd594bd58b4871d06296ade1",
  //   status: "active",
  //   createdBy: "Jinjun Xiong",
  //   tasks: sampleTasks,
  // });
  const [board, setBoard] = useState({});
  const [papers, setPapers] = useState({});
  // let board = {};
  // let papers = [];
  const [loading, setIsLoading] = useState(true);
  const [result, setResult] = useState({});
  const location = useLocation();

  // fetchBoard(id).then((brd) => {
  //   const b = brd
  //   setBoard(b);
  // }

  // async function fetchBoardData() {
  //   // const boards = getBoards();
  //   // if (boards) {
  //   //   setRecentBoards(boards);
  //   // }
  //   try {
  //     const response = await fetch("https://project700-backend-neo.herokuapp.com/roadmap/all/", {
  //       method: "GET",
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     });
  //     const json = await response.json();
  //     const result = json.roadmaps;
  //     setBoard(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   console.log("Inside fetch");
  // }
  const fetchBoardData = async (id) => {
    try {
      const response = await fetch(`https://project700-backend-neo.herokuapp.com/roadmap/info${id}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const json = await response.json();
      // setBoard(json);

      return json;
    } catch (error) {
      console.log(error);
    }
  };
  const getPapersdata = async () => {
    try {
      const response = await fetch(`https://project700-backend-neo.herokuapp.com/roadmap/papers${id}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const json = await response.json();
      // setPapers(json.roadmap_papers);

      return json.roadmap_papers;
      // const result = json.roadmaps;
      // setRecentBoards(result);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(board, papers);

  // fetchBoardData();
  useEffect(() => {
    async function fetchData(id: string) {
      fetchBoardData(id);
      getPapersdata();
      // fetchBoard(n);
      updateBoard(id, location.state);
      setIsLoading(true);
      // setBoard(getBoard(id));
      // brd ? setBoard(location.state) : null;
      setIsLoading(false);
    }
    fetchData(id);
    // fetchBoardData(id);
    // getPapersdata();
  }, [board, papers]);

  if (loading) {
    return (
      <div className="BoardLoading">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      {board ? (
        <BoardArea board={board} boardId={id} papers={papers} />
      ) : (
        // : result ? (
        //   <ViewPdf pdf={result} />
        // )
        <Typography variant="body2">No roadmaps found</Typography>
      )}
    </>
  );
};

export default Roadmap;
