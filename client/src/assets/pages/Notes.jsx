
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notes.css";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  // =========================
  // GET NOTES
  // =========================

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:5000/api/notes",
        {
          withCredentials: true,
        }
      );

      setNotes(response.data.notes || response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to load notes"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // =========================
  // CREATE / UPDATE NOTE
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }

    if (!content.trim()) {
      setError("Please enter some content.");
      return;
    }

    try {
      setSaving(true);

      // UPDATE
      if (editingId) {
        const response = await axios.put(
          `http://localhost:5000/api/notes/${editingId}`,
          {
            title: title.trim(),
            content: content.trim(),
          },
          {
            withCredentials: true,
          }
        );

        const updatedNote =
          response.data.note || response.data;

        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === editingId
              ? updatedNote
              : note
          )
        );

        cancelEdit();

        return;
      }

      // CREATE
      const response = await axios.post(
        "http://localhost:5000/api/notes",
        {
          title: title.trim(),
          content: content.trim(),
        },
        {
          withCredentials: true,
        }
      );

      const newNote =
        response.data.note || response.data;

      setNotes((prevNotes) => [
        newNote,
        ...prevNotes,
      ]);

      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to save note"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (note) => {
    setEditingId(note._id);

    setTitle(note.title);
    setContent(note.content);

    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await axios.delete(
        `http://localhost:5000/api/notes/${id}`,
        {
          withCredentials: true,
        }
      );

      set
```
