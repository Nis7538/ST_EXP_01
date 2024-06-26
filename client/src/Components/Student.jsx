import axios from 'axios';
import { useEffect, useState } from 'react';

function Student() {
    const [id, setId] = useState('');
    const [stname, setName] = useState('');
    const [course, setCourse] = useState('');
    const [fee, setFee] = useState('');
    const [mobile, setMobile] = useState('');

    const [students, setUsers] = useState([]);

    useEffect(() => {
        (async () => await Load())();
    }, []);

    async function Load() {
        const result = await axios.get(
            'http://localhost:9002/api/student/view'
        );
        setUsers(result.data.data);
        console.log(result.data);
    }

    async function save(event) {
        event.preventDefault();
        try {
            if (stname === '') {
                alert('Please Enter Student Name');
                return;
            } else if (course === '') {
                alert('Please Enter Course');
                return;
            } else if (fee === '') {
                alert('Please Enter Fee');
                return;
            } else if (mobile === '') {
                alert('Please Enter Mobile');
                return;
            }
            await axios.post('http://localhost:9002/api/student/add', {
                stname: stname,
                course: course,
                fee: fee,
                mobile: mobile,
            });
            alert('Student Registation Successfully');

            Load();
        } catch (err) {
            alert('User Registation Failed');
        }
    }
    async function editStudent(students) {
        setName(students.stname);
        setCourse(students.course);
        setFee(students.fee);
        setId(students.id);
        setMobile(students.mobile);
    }

    async function DeleteStudent(id) {
        await axios.delete('http://localhost:9002/api/student/delete/' + id);
        alert('Student deleted Successfully');
        Load();
    }

    async function update(event) {
        event.preventDefault();

        try {
            if (stname === '') {
                alert('Please Enter Student Name');
                return;
            } else if (course === '') {
                alert('Please Enter Course');
                return;
            } else if ('^d+(,d{1,2})?$'.match(fee)) {
                alert('Please Enter Valid Fees');
                return;
            } else if (
                '((+*)((0[ -]*)*|((91 )*))((d{12})+|(d{10})+))|d{5}([- ]*)d{6}'.match(
                    mobile
                )
            ) {
                alert('Please Enter Valid Mobile Number');
                return;
            }
            await axios.put(
                'http://localhost:9002/api/student/update/' +
                    students.find(u => u.id === id).id || id,
                {
                    id: id,
                    stname: stname,
                    course: course,
                    fee: fee,
                    mobile: mobile,
                }
            );
            alert('Registation Updateddddd');
            Load();
        } catch (err) {
            console.log(err);
            alert(' Registation Failed');
        }
    }

    const refresh = () => {
        setId('');
        setName('');
        setCourse('');
        setFee('');
        setMobile('');
    };

    return (
        <div>
            <h1>Student Details</h1>
            <div className='container mt-4'>
                <form>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='student_id'
                            hidden
                            value={id}
                            onChange={event => {
                                setId(event.target.value);
                            }}
                        />
                        <label>Student Name</label>
                        <input
                            type='text'
                            className='form-control'
                            id='name'
                            value={stname}
                            onChange={event => {
                                setName(event.target.value);
                            }}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Course</label>
                        <input
                            type='text'
                            className='form-control'
                            id='course'
                            value={course}
                            onChange={event => {
                                setCourse(event.target.value);
                            }}
                        />
                    </div>

                    <div className='form-group'>
                        <label>Fee</label>
                        <input
                            type='text'
                            className='form-control'
                            id='fee'
                            value={fee}
                            onChange={event => {
                                setFee(event.target.value);
                            }}
                        />
                    </div>

                    <div className='form-group'>
                        <label>Mobile</label>
                        <input
                            type='text'
                            className='form-control'
                            id='mobile'
                            value={mobile}
                            onChange={event => {
                                setMobile(event.target.value);
                            }}
                        />
                    </div>

                    <div>
                        <button
                            id='registerBtn'
                            className='btn btn-primary mt-4'
                            onClick={save}
                        >
                            Register
                        </button>
                        <button
                            id='updateBtn'
                            className='btn btn-warning mt-4'
                            onClick={update}
                        >
                            Update
                        </button>
                        <button
                            id='refreshBtn'
                            className='btn btn-secondary mt-4'
                            onClick={refresh}
                        >
                            Refresh
                        </button>
                    </div>
                </form>
            </div>

            <table className='table table-dark' align='center'>
                <thead>
                    <tr>
                        <th scope='col'>Student Id</th>
                        <th scope='col'>Student Name</th>
                        <th scope='col'>Course</th>
                        <th scope='col'>Fee</th>
                        <th scope='col'>Mobile</th>

                        <th scope='col'>Option</th>
                    </tr>
                </thead>
                {students.map(function fn(student) {
                    return (
                        <tbody key={student.mobile}>
                            <tr>
                                <th scope='row'>{student.id} </th>
                                <td>{student.stname}</td>
                                <td>{student.course}</td>
                                <td>{student.fee}</td>
                                <td>{student.mobile}</td>
                                <td>
                                    <button
                                        type='button'
                                        className='btn btn-warning'
                                        onClick={() => editStudent(student)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type='button'
                                        className='btn btn-danger'
                                        onClick={() =>
                                            DeleteStudent(student.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
        </div>
    );
}
export default Student;
