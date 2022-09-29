import { Button, Card, CardActions, CardContent, CardHeader, Grow, TextField } from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addNewBoard } from '../../../service/roadmaps';
import { Routes } from '../../../service/config';
import { NewRoadmap } from '../../../types/roadmap';
import './CreateRoadmap.css';
import ChipInputAutosuggest from "./ChipInputAutosuggest";

export const CreateRoadmap = () => {
  const suggestions = [
    "machine Learning",
    "ML",
    "AI",
    "computer vision",
    "deep learning",
    "ML/DL",
    "CNN",
    "ANN",
    "reinforcement learning",
    "NLP",
    "neural network",
    "unsupervised",
    "back propagation",
    "bag of words",
    "batch normalization",
    "bayesian network",
    "BERT"
  ];
  const history = useHistory();
  const [roadmapName, setRoadmapName] = useState('Test Roadmap');
  const [createdBy, setCreatedBy] = useState('');
  const [levels, setLevels] = useState('3');
  const [tags, setTags] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const board: NewRoadmap = {
      name: roadmapName,
      createdBy: createdBy,
      levels: levels,
      tags: tags,
      createdAt: new Date(),
    };
    const newBoardId = await addNewBoard(board);
    history.push(`${Routes.boards}/${newBoardId}`);
  };

  return (
    <Grow in={true} timeout={1000}>
      <form onSubmit={handleSubmit}>
        <Card variant='outlined' className='CreateBoardCard'>
          <CardHeader
            className='CreateBoardCardHeader'
            title='New Roadmap'
            titleTypographyProps={{ variant: 'h4' }}
          />
          <CardContent className='CreateBoardCardContent'>
            <TextField
              className='CreateBoardTextField'
              required
              id='filled-required'
              label='Roadmap Name'
              placeholder='Enter a name for the roadmap'
              defaultValue={roadmapName}
              variant='outlined'
              onChange={(event: ChangeEvent<HTMLInputElement>) => setRoadmapName(event.target.value)}
            />
            <TextField
              className='CreateBoardTextField'
              required
              id='filled-required'
              label='Levels'
              placeholder='Enter the number of levels'
              defaultValue={levels}
              variant='outlined'
              onChange={(event: ChangeEvent<HTMLInputElement>) => setLevels(event.target.value)}
            />
            {/* <TextField
              className='CreateBoardTextField'
              required
              id='filled-required'
              label='Tags'
              placeholder='Enter relevant tags'
              defaultValue={tags}
              variant='outlined'
              onChange={(event: ChangeEvent<HTMLInputElement>) => setTags(event.target.value)}
            /> */}
            <ChipInputAutosuggest data={suggestions} />
          </CardContent>
          <CardActions className='CreateBoardCardAction'>
            <Button type='submit' variant='contained' color='primary' className='CreateBoardButton'>
              Next
            </Button>
          </CardActions>
        </Card>
      </form>
    </Grow>
  );
};
