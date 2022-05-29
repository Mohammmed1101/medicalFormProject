import React from 'react';
import { useContext} from "react"
import PostsContext from '../../utils/PostsContext';
import { useParams } from 'react-router-dom'
import "./reset.css"
function Forgetpassword() {
	const { errorResetPassword, resetPassword } = useContext(PostsContext)
    const { token } = useParams()
    return (
        <div>
            <div className="container h-100">
    		<div className="row h-100">
				<div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
					<div className="d-table-cell align-middle">
						<div className="text-center mt-4">
							<h1 className="h2">استعادة كلمه المرور</h1>                         
                         <img className="resetimg"src="https://www.security.org/wp-content/uploads/2020/12/password-manager.png"   alt='doctor' width="55%"/>
						</div>
						<div className="card2">
							<div className="card-body">
								<div className="m-sm-4">
									<form onSubmit={e => resetPassword(e, token)}>
										<div className="form-group" >
											<label>كلمه المرورالجديده</label>
											<input className="form-control form-control-lg" required type="password"  name="password" />
                                            <label>اعاده كلمه المرورالجديده </label>
                                            <input className="form-control form-control-lg"  required  type="password"  name="confirmPassword"/>

										</div>
										<div className="text-center mt-3">
											<button type="submit" className="btn btn-outline-success">استعادة كلمه المرور</button>
										</div>
									</form>

                                     {/* Alert */}
                                   
                                       {errorResetPassword!==null?   
                                       <div className="alert alert-success"> <strong className="default"><i className="fa fa-hdd-o"></i>{errorResetPassword} </strong>
		                                </div>
                                    : null} 

                                  

								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
        </div>
    );
}

export default Forgetpassword;