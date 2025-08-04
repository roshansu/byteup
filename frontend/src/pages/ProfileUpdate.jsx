import { useState, useEffect } from "react";
import PageNotFOund from "./PageNotFound";
import imageCompression from 'browser-image-compression'
import { useNavigate } from "react-router-dom";
import SuccessAlert from "../component/Successalert";

export default function ProfileUpdate({isLogin, userId, role}) {
  const [user, setUser] = useState(null);
  const [editField, setEditField] = useState(null);
  const [fieldValue, setFieldValue] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [hide, setHide] = useState('')
  const navigate = useNavigate()

    if (!isLogin)
            return(<PageNotFOund/>)
        if (role === 'admin')
            return(<PageNotFOund/>)
console.log(userId)
  useEffect(() => {
    // Fetch user
    console.log(userId)
    fetch(`https://byteup-ten.vercel.app/user/${userId}`,{
      method:"GET"
    })
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  const handleUpdate = async (field) => {
      setHide('success')
    if (field === "photo") {
       const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        };

      const compressedFile = await imageCompression(photoFile, options);
      console.log(compressedFile)
      const formData = new FormData();
      formData.append('photo', compressedFile);

      await fetch(`https://byteup-ten.vercel.app/user/update/photo/${userId}?url=${encodeURIComponent(user.photo)}`, {
        method: "POST",
        body: formData,
      });
    } else {
      await fetch(`https://byteup-ten.vercel.app/user/update/${field}/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: fieldValue }),
      });
    }

    setEditField(null);
    // Refetch user
    const res = await fetch(`https://byteup-ten.vercel.app/user/${userId}`);
    const updatedUser = await res.json();
    setUser(updatedUser);
  };

  function logOut(){
    localStorage.clear();
    navigate('/')
  }

  if (!user) return <div className="text-center p-6 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto relative p-6 bg-white rounded-xl shadow space-y-4">
      {/* Photo */}
      <button onClick={logOut} className="px-4 flex justify-center items-center absolute top-2 right-2 x-10 py-3 text-white bg-blue-600 rounded-xl">Logout</button>
        { hide === 'success'?<SuccessAlert close={setHide} text={"Field updated"} />:''}

      <div className="flex items-center space-x-4">
        <img
          src={user.photo}
          alt="profile"
          className="w-20 h-20 rounded-full object-cover border"
        />
        {editField === "photo" ? (
          <>
            <input type="file" onChange={(e) => setPhotoFile(e.target.files[0])} />
            <button type="button" onClick={() => handleUpdate("photo")} className="px-3 py-1 text-sm bg-blue-600 text-white rounded">Save</button>
          </>
        ) : (
          <button onClick={() => setEditField("photo")} className="text-blue-500">Update Photo</button>
        )}
      </div>

      {/* Name */}
      <FieldDisplay label="Name" value={user.name} />

      {/* Course */}
      <FieldDisplay label="Course" value={user.course} />

      {/* Passout */}
      <FieldDisplay label="Passout Year" value={user.passout} />

      {/* Role */}
      <FieldDisplay label="Role" value={user.role} />

      {/* Email */}
      <FieldDisplay label="Email" value={user.email} />

      {/* Phone */}
      <FieldDisplay label="Phone" value={user.phone} />

      {/* LinkedIn */}
      <EditableField
        label="LinkedIn"
        field="linkedin"
        value={user.linkedin}
        editField={editField}
        setEditField={setEditField}
        fieldValue={fieldValue}
        setFieldValue={setFieldValue}
        handleUpdate={handleUpdate}
      />

      {/* GitHub */}
      <EditableField
        label="GitHub"
        field="github"
        value={user.github}
        editField={editField}
        setEditField={setEditField}
        fieldValue={fieldValue}
        setFieldValue={setFieldValue}
        handleUpdate={handleUpdate}
      />

      {/* About */}
      <EditableField
        label="About"
        field="about"
        value={user.about}
        editField={editField}
        setEditField={setEditField}
        fieldValue={fieldValue}
        setFieldValue={setFieldValue}
        handleUpdate={handleUpdate}
        isTextarea
      />
    </div>
  );
}

function FieldDisplay({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-800">{value}</p>
    </div>
  );
}

function EditableField({ label, field, value, editField, setEditField, fieldValue, setFieldValue, handleUpdate, isTextarea }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      {editField === field ? (
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-1">
          {isTextarea ? (
            <textarea
              className="border rounded p-2 w-full text-gray-700"
              rows={3}
              value={fieldValue}
              onChange={(e) => setFieldValue(e.target.value)}
            />
          ) : (
            <input
              className="border rounded p-2 w-full text-gray-700"
              type="text"
              value={fieldValue}
              onChange={(e) => setFieldValue(e.target.value)}
            />
          )}
          <button type="button" onClick={() => handleUpdate(field)} className="mt-2 sm:mt-0 bg-blue-600 text-white px-3 py-1 rounded text-sm">
            Save
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center mt-1">
          <p className="text-base font-medium text-gray-800 break-words">{value || "—"}</p>
          <button onClick={() => { setEditField(field); setFieldValue(value || ''); }} className="text-blue-500 text-sm">
            Update
          </button>
        </div>
      )}
    </div>
  );
}
