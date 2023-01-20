import { useSelector } from "react-redux";
import Modal from 'react-modal';

const ModalApp = () => {

    const deleteResponse = useSelector((state) => state.getStatus)
    const modalDetails = useSelector((State) => State.modalDetails)

    return (
        <div>
            <Modal
                isOpen={modalDetails?.visible}
                style={customStyles}
            >
                <div>
                    <h2 >{modalDetails?.modal_title}</h2>
                    <div>{modalDetails?.modal_labal}</div>
                    <p style={{ color: "red" }}>{deleteResponse?.data?.message}</p>
                    <div className="d-flex justify-content-end mt-2">
                        {modalDetails?.data?.map((item) => {
                            switch (item?.type) {
                                case "button":
                                    return (
                                        <button type="button" class={item?.class_name} onClick={item?.onclick}>{item?.label}</button>
                                    )
                            }
                        })

                        }
                    </div>
                </div>
            </Modal>

        </div >
    );
};

const customStyles = {
    content: {
        width: '20%',
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

    },
};

export default ModalApp