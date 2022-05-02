import * as React from 'react';
import { useState, useRef } from 'react'
import { makeStyles } from '@mui/styles';

// UI
import {Button, TextField, Stack, Box, CircularProgress } from '@mui/material';
//import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TimePicker } from '@mui/lab';
// date utils
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';

// MapInput styles
const useStyles = makeStyles({
  autoComplete: {
    width: '100%'
  },
});

type TimeProps = {
  error: boolean,
  helperText: string  | boolean | undefined,
  setHour: (value: number) => void,
  setMinutes: (value: number) => void
}

export const TimeInput = ({setHour, setMinutes, error, helperText}:TimeProps) => {
  const classes = useStyles();

  const [value, setValue] = React.useState<Date | null>(null);

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
  <Stack alignItems= 'center' spacing={4} justifyContent= 'center' sx={{width: '100%'}}>
        <Box sx={{ height: 100, width: 100 }}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <TimePicker
              label="Time"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
  </Stack>
  )
}