import React, { useState } from 'react';
import './StudentsScreen.css';
import { ScrollContainer } from 'react-nice-scroll';
import EntryListView from '../../components/EntryListView';

const StudentsScreen = () => {
  const [students, setStudents] = useState<any>([]);
  const [classes, setClasses] = useState<any>([]);

  return (
    <div className="students-screen">
      <EntryListView
        list={students}
        title="Students"
        itemName="Student"
        onAdd={() => {
          setStudents([
            ...students,
            { name: 'New Student ' + Math.floor(Math.random() * 1000) },
          ] as any);
        }}
      />
      <EntryListView
        list={classes}
        title="Classes"
        itemName="Class"
        onAdd={() => {
          setClasses([
            ...classes,
            { name: 'New Class ' + Math.floor(Math.random() * 1000) },
          ] as any);
        }}
      />
    </div>
  );
};

export default StudentsScreen;
