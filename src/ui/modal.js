
import { createPortal} from 'react-dom'

// Modal
export const Modal = ({children,title, onClose , sup = true})=>{
    return createPortal(<>
    
    <div className="modal fade show"    role="dialog" style={{display:'block'}}>
    <div className={sup?"modal-dialog modal-xl" : "modal-dialog modal-sm"}>
        <div className="modal-content">
        <div className="modal-header ">
            <h5 className="modal-title ms-auto" >
                {title}
            </h5>
            <button  type="button" onClick={onClose}  className="btn-close" aria-label="Close"></button>
        </div>
        <div className="modal-body d-flex justify-content-center ">
            
            <div className="mb-3 ">
                {children}
            </div>
        </div>
        
        </div>
    </div>
    </div>
    <div className="modal-backdrop fade show"></div>
    </>,document.getElementById('root'))
}