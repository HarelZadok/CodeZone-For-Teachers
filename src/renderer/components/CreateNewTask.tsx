import React, { useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import './CreateNewTask.css';
import { useToast } from './Toast';
import { createTask, removeUndefined } from '../functions';

type CreateNewTaskProps = {
  onBackPressed: () => void;
};

export const CreateNewTask = (props: CreateNewTaskProps) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const showToast = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const description = (
      form.elements.namedItem('description') as HTMLTextAreaElement
    ).value;

    const task = {
      title,
      description,
      startDate,
      dueDate,
    };

    removeUndefined(task);

    try {
      await createTask(task);
      showToast('Task created successfully');
      props.onBackPressed();
    } catch (error: any) {
      showToast(error.message);
    }
  };

  return (
    <div className="create-new-task__container">
      <div className="create-new-task__content">
        <button
          onClick={props.onBackPressed}
          className="create-new-task__back-button"
        >
          <IoMdArrowRoundBack className="create-new-task__back-button-icon" />
          <span>Back</span>
        </button>
        <span className="create-new-task__title">Create a new task</span>
        <span className="create-new-task__description">
          Fill in the form below to create a new task.
        </span>
        <form onSubmit={handleSubmit} className="create-new-task__form">
          <label className="create-new-task__form-label" htmlFor="title">
            Title *
          </label>
          <input
            className="create-new-task__form-input"
            type="text"
            id="title"
            name="title"
            required
          />
          <label className="create-new-task__form-label" htmlFor="description">
            Description *
          </label>
          <textarea
            className="create-new-task__form-textarea"
            id="description"
            name="description"
            required
          />
          <label className="create-new-task__form-label" htmlFor="dueDate">
            Due date
          </label>
          <DatePicker.RangePicker
            className="create-new-task__form-input"
            variant="borderless"
            id="dueDate"
            name="dueDate"
            inputReadOnly
            onChange={(value) => {
              if (!value) {
                setStartDate(new Date());
                setDueDate(undefined);
                return;
              }
              setStartDate(value[0]!.toDate());
              setDueDate(value[1]!.toDate());
            }}
            style={{ width: 'fit-content' }}
            disabledDate={(current) => {
              return (
                current < dayjs(new Date().toISOString()) &&
                current.format('DD-MM-YYYY') !==
                  dayjs(new Date().toISOString()).format('DD-MM-YYYY')
              );
            }}
            disabledTime={(current) => {
              return {
                disabledHours: () => {
                  if (
                    current.format('DD-MM-YYYY') ===
                    dayjs(new Date().toISOString()).format('DD-MM-YYYY')
                  ) {
                    return [...Array(24).keys()].filter(
                      (hour) => hour < dayjs(new Date().toISOString()).hour(),
                    );
                  }

                  return [];
                },
                disabledMinutes: () => {
                  if (
                    current.format('DD-MM-YYYY HH') ===
                    dayjs(new Date().toISOString()).format('DD-MM-YYYY HH')
                  ) {
                    return [...Array(60).keys()].filter(
                      (minute) =>
                        minute < dayjs(new Date().toISOString()).minute() + 1,
                    );
                  }

                  return [];
                },
              };
            }}
            showNow={false}
            showTime={{ format: 'HH:mm' }}
            format="DD/MM/YYYY, HH:mm"
          />

          <button type="submit" className="create-new-task__form-submit">
            Create task
          </button>
        </form>
      </div>
    </div>
  );
};
