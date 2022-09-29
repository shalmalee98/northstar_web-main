import { Button, Fade } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Roadmap, Paper } from "../../../types/roadmap";
import { AddPaper } from "../../Tasks/AddPaper/AddPaper";
import { PaperCard } from "../../Tasks/TaskCard/PaperCard";
import "./BoardArea.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import ReactBoard from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import { Status } from "../../../types/status";
import useId from "@mui/material/utils/useId";

interface BoardAreaProps {
  board: Roadmap;
}
// export const BoardArea: React.FC<BoardAreaProps> = ({ board }, paper) => {
export const BoardArea = (props) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [boardId, setBoardId] = useState(props.boardId);
  const [board, setBoard] = useState(props.board);
  const [papers, setPapers] = useState([]);
  const [data, setData] = useState({
    columns: [
      {
        id: 1,
        title: "Level 1",
        cards: getTasksByStatus(board.tasks, Status.NotStarted),
        // cards: papers
      },
      {
        id: 2,
        title: "Level 2",
        cards: getTasksByStatus(board.tasks, Status.InProgress),
        // cards: papers
      },
      {
        id: 3,
        title: "Level 3",
        cards: getTasksByStatus(board.tasks, Status.Finished),
      },
    ],
  });

  const getPapersdata = async () => {
    try {
      const response = await fetch(`https://project700-backend-neo.herokuapp.com/roadmap/papers${boardId}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const json = await response.json();
      setPapers(json.roadmap_papers);

      return json.roadmap_papers;
      // const result = json.roadmaps;
      // setRecentBoards(result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBoard = async (boardId) => {
    try {
      const response = await fetch(`https://project700-backend-neo.herokuapp.com/roadmap/info${boardId}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const json = await response.json();
      setBoard(json);

      return json;
    } catch (error) {
      console.log(error);
    }
  };
  // fetchBoard(boardId).then((brd) => {
  //   const b = brd
  //   setBoard(b);
  // }
  // getPapersdata()

  // let p = Array();
  // getPapersdata().then((papers) => (p = papers));
  // console.log(p);

  // // const {roadmapLabel, levels, tags, roadmap} = route.params;

  const getData = () => {
    let columns = Array();
    papers.map((paper) => {
      console.log(paper);
      // columns.push({
      //   id: paper.uid,
      //   title: paper.name,
      //   cards: paper,
      // });
    });
    const d = {
      columns: columns,
    };
    setData(d);
  };

  // const data = {
  // columns: [
  //   {
  //     id: 1,
  //     title: "Level 1",
  //     cards: getTasksByStatus(board.tasks, Status.NotStarted),
  //     // cards: papers
  //   },
  //   {
  //     id: 2,
  //     title: "Level 2",
  //     cards: getTasksByStatus(board.tasks, Status.InProgress),
  //     // cards: papers
  //   },
  //   {
  //     id: 3,
  //     title: "Level 3",
  //     cards: getTasksByStatus(board.tasks, Status.Finished),
  //   },
  // ],
  // };

  // const createRequest = async () => {
  //   const postData = {
  //     name: roadmapLabel,
  //     rating: 0,
  //     author: "Jinjun Xiong",
  //     email: "jinjun@gmail.com",
  //     tags: tags,
  //     levels: levels,
  //     public: true,
  //   };
  //   const response = await axios.put(`https://project700-backend-neo.herokuapp.com/roadmap/?roadmap_id=`, postData);
  //   try {
  //     if (response.status === 200) {
  //       console.log(` You have created: ${JSON.stringify(response.data)}`);
  //     } else {
  //       throw new Error("An error has occurred");
  //     }
  //   } catch (error) {
  //     console.log("An error has occurred");
  //   }

  //   for (var level = 1; level <= levels; level++) {
  //     const levelList = filterPapers(level);
  //     levelList?.map((paper, index) => {
  //       const postPaper = {
  //         name: paper.title,
  //         publish: today,
  //         roadmaps: [
  //           {
  //             rm: roadmapLabel,
  //             level: String(level),
  //             diffculty: String(index + 1),
  //           },
  //         ],
  //         link: paper.link,
  //       };
  //       //console.log(postPaper);
  //       axios
  //         .put("https://project700-backend-neo.herokuapp.com/paper", postPaper)
  //         .then((res) => {
  //           console.log(` You have updated a paper: ${JSON.stringify(res)}`);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     });
  //   }
  //   navigation?.navigate("DrawerStack", { screen: "MyRoadmaps" });
  // };

  useEffect(() => {
    fetchBoard(boardId);
    getPapersdata();
    // getData();
  }, [board, papers, data]);

  console.log(board, papers);
  const renderCard = ({ content }, { removeCard, dragging }) => (
    <>
      <PaperCard boardId={boardId} task={content}></PaperCard>
    </>
  );
  return (
    <>
      <div className="BoardAreaHeader">
        <div className="BoardAreaHeaderContainer">
          <h3 className="name">{board.name}</h3>
          <Button startIcon={<AddCircleOutlineIcon />} color="primary" onClick={() => setShowAddTask(true)}>
            Add Paper
          </Button>
        </div>
      </div>

      <Fade in={true} timeout={2000}>
        <div>
          <ReactBoard initialBoard={papers} renderCard={renderCard}></ReactBoard>
        </div>
      </Fade>
      {showAddTask && <AddPaper show={showAddTask} onClose={() => setShowAddTask(false)} boardId={boardId}></AddPaper>}
      {/* <div>
        <Button
          align="center"
          startIcon={<AddCircleOutlineIcon />}
          color="primary"
          onClick={() => setShowAddTask(true)}
        >
          Save Roadmap
        </Button>
      </div> */}
      <div className="Footer"></div>
    </>
  );
};

export default BoardArea;

const getTasksByStatus = (tasks: Paper[], status: Status) => {
  if (tasks != undefined) {
    return {
      id: useId,
      content: {
        ...tasks,
      },
    };
    // const filteredTasks = tasks
    //   .filter((task) => task.status === status)
    //   .map((task) => {
    //     return {
    //       id: task.id,
    //       content: {
    //         ...task,
    //       },
    //     };
    //   });
    // return filteredTasks;
  }
};
