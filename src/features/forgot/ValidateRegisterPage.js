import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AuthServices from '../../services/AuthServices';
import queryString from 'query-string';
import { useAuth } from '../../context/auth';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

ValidateRegisterPage.propTypes = {

};

function ValidateRegisterPage(props) {

    const search = queryString.parse(window.location.search);;
    const { auth, setAuth } = useAuth();
    const history = useHistory();

    useEffect(() => {
        validateAcc(search.token)
    }, []);

    const validateAcc = () => {
        AuthServices.validateRegister(search.token).then(res => {
            if (res.status == 200) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Xác nhận thành công !!!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(result => {
                    window.localStorage.setItem("token", res.data.token);
                    setAuth(res.data.user);
                    history.replace('/');
                });
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Xác nhận thất bại !!!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(res => {
                    history.replace('/');
                })
            }
        }).catch(err => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Xác nhận thất bại !!!',
                showConfirmButton: false,
                timer: 1500
            }).then(res => {
                history.replace('/');
            })
        })
    }

    return (
        <div>

        </div>
    );
}

export default ValidateRegisterPage;