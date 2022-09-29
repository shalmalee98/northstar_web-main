import { Divider } from "@material-ui/core";
import { DeleteForeverOutlined } from "@material-ui/icons";
import React from "react";
import { deleteTask } from "../../../service/task";
import { Paper } from "../../../types/roadmap";
import { Status } from "../../../types/status";
import { useHistory } from "react-router-dom";
import "./PaperCard.css";
import { DiagnosticCategory } from "typescript";
import { ViewPdf } from "../ViewPdf/ViewPdf";
import { Document, Page } from "react-pdf";
import { Button, Slide, useMediaQuery, useTheme } from "@material-ui/core";

export interface TaskCardProps {
  task: Paper;
  boardId: string;
}

export const PaperCard: React.FC<TaskCardProps> = ({ boardId, task }) => {
  const history = useHistory();
  if (!task) {
    return null;
  }

  // const ViewPdf = (task) => {
  //   return (
  //     <div>
  //       <Document file={task.description}>{/* <Page pageNumber={pageNumber} /> */}</Document>
  //     </div>
  //   );
  // };
  return (
    // <button
    //   onClick={() => {
    //     return <Document file={task.description}>{/* <Page pageNumber={pageNumber} /> */}</Document>;
    //   }}
    // >
    <Button
      className="TaskCard"
      onClick={() => {
        history.push(`/boards/${task.description}`, task);
      }}
      style={{
        borderLeft: `3px solid ${getCardBorderColor(task.level)}`,
      }}
    >
      <div className="TaskCardHeader">
        <div> {task.name}</div>
        <button
          className="TaskDeleteButton"
          title="Delete paper"
          onClick={() => {
            deleteTask(task.uid, boardId);
            history.go(0);
          }}
        >
          <DeleteForeverOutlined></DeleteForeverOutlined>
        </button>
      </div>
      <Divider variant="middle"></Divider>
      <div className="TaskCardContent" title={task.description}>
        {task.description}
      </div>
      {/* <div className='TaskCardFooter'>
        <div title={task.createdBy} className='TaskFooterOwner'>
          {task.createdBy?.substr(0, 1).toUpperCase()}
        </div>
      </div> */}
    </Button>
    // </button>
  );
};

const getCardBorderColor = (stat) => {
  switch (stat) {
    case 0:
      return "red";
    case 1:
      return "cornflowerblue";
    case 2:
      return "limegreen";
    default:
      return "red";
  }
};
