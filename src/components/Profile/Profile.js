import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Toast from '../Toast/Toast';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [previewSource, setPreviewSource] = useState('');
    const [message, setMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const fileTypes = ['jpg', 'pdf', 'png', 'jpeg', 'image/jpg', 'image/pdf', 'image/png', 'image/jpeg'];

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        let id = localStorage.getItem('_ID');
        if (!id) {
            navigate('/');
            localStorage.clear();
        } else {
            axios.get('/api/users/' + id)
                .then((res) => setUser(res.data.user))
                .catch((err) => console.log(err));
        }
    }

    const handleFileInputChange = e => {
        const file = e.target.files[0];
        if (!fileTypes.includes(file.type)) {
            setMessage('Must be either jpg, pdf, or png');
        } else {
            setMessage('');
            previewFile(file);
        }
    }

    const previewFile = (file) => {
        if (file.size > 10000000) {
            setMessage('File size too big');
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (message.length > 0 || !previewSource || !user) return;

        axios.post('/api/users/upload-image', JSON.stringify({
            data: previewSource,
            _id: user._id
        }))
        .then((res) => {
            if (res.data && res.data.message) {
                setMessage(res.data.message);
            } else {
                setMessage('Success');
            }
            setShowToast(true);
            setPreviewSource('');
            getUser();
        })
        .catch((err) => {
            console.log(err);
            setMessage('Something went wrong uploading image');
            setShowToast(true);
        })
    }

    return (
        <div className="profile-wrapper">
            <Toast model={showToast} message={message} />
            <div>
                <Sidebar />
            </div>

            <div className="body">
                {user &&
                    <div className="cards">
                        <div className="left">
                            <div className="img-uploader">
                                <div>Upload Avatar Image</div>
                                <div className="upload-box">
                                    <input onChange={(e) => handleFileInputChange(e)} type="file" />
                                    {previewSource ?
                                        <img className="display-image" src={previewSource} alt="Preview" />
                                        : (user.avatar && user.avatar.url ? <img style={{borderRadius: '50%', objectFit: 'cover', margin: '20px auto 0 25px', width: '25vw', height: '25vw'}} className="display-image" src={user.avatar.url} alt="User Avatar" />  : <img className="display-image" src={previewSource} alt="Preview" /> )}
                                </div>
                                <div style={{color: message === 'Success' ? 'green' : 'red', fontSize: '.8em', margin: '20px 0'}}>{ message }</div>
                                <button className="image-btn" style={{marginTop: '20px'}} onClick={(e) => handleSubmitFile(e)}>Save</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Profile;
