import React, { useEffect, useState } from 'react';
import './StudentsScreen.css';
import EntryListView from '../../components/EntryListView';
import { addStudent, getStudents } from '../../functions';

const StudentsScreen = () => {
  const [students, setStudents] = useState<any>([]);
  const [classes, setClasses] = useState<any>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const students = await getStudents();
        setStudents(students);
      } catch (e) {
        console.error(e);
      }
    };

    fetchStudents();
  }, []);

  const handleAddStudent = async () => {
    try {
      await addStudent(
        'new-student-' + Math.floor(Math.random() * 1000),
        'New Student',
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="students-screen">
      <EntryListView
        list={students}
        title="Students"
        itemName="Student"
        onAdd={handleAddStudent}
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
