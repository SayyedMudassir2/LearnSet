'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Note {
  id: string;
  branch: string;
  subject: string;
  semester: string;
  title: string;
  description: string;
  fileUrl: string;
  approved: boolean;
}

const AdminPage = () => {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/');
    }
  }, [user, isAdmin, loading, router]);

  useEffect(() => {
    const fetchNotes = async () => {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const notesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Note[];
      setNotes(notesData);
    };

    if (isAdmin) {
      fetchNotes();
    }
  }, [isAdmin]);

  const handleApprove = async (id: string) => {
    const noteRef = doc(db, "notes", id);
    await updateDoc(noteRef, { approved: true });
    setNotes(notes.map(note => note.id === id ? { ...note, approved: true } : note));
  };

  const handleReject = async (id: string) => {
    const noteRef = doc(db, "notes", id);
    await deleteDoc(noteRef);
    setNotes(notes.filter(note => note.id !== id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notes.map(note => (
              <div key={note.id} className="border p-4 rounded-md">
                <h3 className="font-bold">{note.title}</h3>
                <p>{note.description}</p>
                <p><strong>Branch:</strong> {note.branch}</p>
                <p><strong>Semester:</strong> {note.semester}</p>
                <a href={note.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Note</a>
                <div className="mt-4">
                  {!note.approved && (
                    <Button onClick={() => handleApprove(note.id)} className="mr-2">Approve</Button>
                  )}
                  <Button onClick={() => handleReject(note.id)} variant="destructive">Reject</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
