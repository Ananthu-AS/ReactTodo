import React, { useState, useEffect } from "react";

export const TodoList = () => {
    const [value, setValue] = useState("");
    const [list, setList] = useState(() => {
        var lis = localStorage.getItem("todolist");
        return lis ? JSON.parse(lis) : [];
    });
    const [editval, setEditval] = useState(null);

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    // edit and save start
    const handleSubmit = () => {
        if (editval !== null) {
            setList((current) => {
                const updatedList = [...current];
                updatedList[editval] = value;
                return updatedList;
            });
            setEditval(null);
        } else {
            setList((current) => [...current, value]);
        }
        setValue("");
    };
    useEffect(() => {
        localStorage.setItem("todolist", JSON.stringify(list));
    }, [list]);
    // edit and save end
    const handleEdit = (index) => {
        setEditval(index);
        setValue(list[index]);
    };

    const handleDelete = (index) => {
        setList((current) => current.filter((_, i) => i !== index));
    };

    return (
        <>
            <div className="container-fluid vh-100 p-0 m-0 row align-items-center bg-success-subtle">
                <div className="container w-50 p-5 bg-success rounded-3">
                    <h1 className="text-center mb-5">TO-DO-LIST</h1>
                    <div className="row p-0 m-0 justify-content-evently">
                        <div className="col-7">
                            <input
                                type="text"
                                onChange={handleChange}
                                value={value}
                                className="form-control"
                            />
                        </div>
                        <div className="col-3 p-0 m-0">
                            <button
                                onClick={handleSubmit}
                                className="form-control bg-primary"
                            >
                                {editval !== null ? "Save" : "Submit"}
                            </button>
                        </div>
                    </div>

                    {list.map((item, index) => (
                        <div key={index} className="row p-0 m-0 mt-3">
                            <h3 className="col-6">{item}</h3>
                            <div className="col-3">
                                <button
                                    onClick={() => handleEdit(index)}
                                    className="form-control bg-info"
                                >
                                    Edit
                                </button>
                            </div>
                            <div className="col-3">
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="form-control bg-danger"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
