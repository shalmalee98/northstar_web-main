import { Button, Card, CardActions, CardContent, Dialog, DialogTitle, TextField } from "@material-ui/core";
import { Description } from "@material-ui/icons";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { ulid } from "ulid";
import { addTask } from "../../../service/task";
import { Paper } from "../../../types/roadmap";
import { Status } from "../../../types/status";
import "./AddPaper.css";
import { useHistory } from "react-router-dom";

export interface AddPaperProps {
  boardId: string;
  show: boolean;
  onClose: () => void;
}
export const AddPaper: React.FC<AddPaperProps> = ({ show, boardId, onClose }) => {
  const history = useHistory();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [taskLevel, setTaskLevel] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [link, setLink] = useState("");
  const [referencedWorks, setReferencedWorks] = useState([]);
  const [relatedWorks, setRelatedWorks] = useState([]);
  const [publish, setPublish] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const task: Paper = {
      uid: ulid(),
      name: taskName,
      description: taskDescription,
      level: taskLevel,
      diffculty: difficulty,
      link: link,
      referenced_works: referencedWorks,
      related_works: relatedWorks,
      publish: publish,
      // status: Status.NotStarted,
      // createdBy: createdBy,
      // createdAt: new Date(),
    };
    addTask(task, boardId);
    onClose();
    history.go(0);
  };

  return (
    <Dialog onClose={() => onClose()} aria-labelledby="simple-dialog-title" open={show}>
      <DialogTitle id="simple-dialog-title">Add Paper</DialogTitle>

      <form onSubmit={handleSubmit}>
        <Card variant="outlined" className="AddTaskCard">
          <CardContent className="AddTaskCardContent">
            <TextField
              className="AddTaskTextField"
              required
              id="filled-required"
              label="Paper Name"
              placeholder="Enter the article name"
              defaultValue={taskName}
              variant="outlined"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setTaskName(event.target.value)}
            />
            <TextField
              className="AddTaskTextField"
              required
              id="filled-required"
              label="Link to Paper"
              placeholder="Enter URL"
              defaultValue={taskDescription}
              variant="outlined"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setTaskDescription(event.target.value)}
            />
            <TextField
              className="AddTaskTextField"
              required
              id="paper-level-input"
              label="Paper Level"
              placeholder="Enter the level"
              defaultValue={taskLevel}
              variant="outlined"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setTaskLevel(parseInt(event.target.value))}
            />
          </CardContent>
          <CardActions className="AddTaskCardAction">
            <Button type="submit" variant="contained" color="primary" className="AddTaskButton">
              Add
            </Button>
          </CardActions>
        </Card>
      </form>
    </Dialog>
  );
};
