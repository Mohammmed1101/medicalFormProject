import React from 'react';
import { useContext} from "react"
import PostsContext from '../../utils/PostsContext';
import Forget from "../../assets/forget.png"
import "./forget.css"
function Forgetpassword() {
    const { errorForgetPassword, forgetPassword, successForgetPassword } = useContext(PostsContext)
    return (
        <div>
            <div className="container h-100">
    		<div className="row h-100">
				<div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
					<div className="d-table-cell align-middle">

						<div className="text-center mt-4">
							<h1 className="h2">استعادة كلمه المرور</h1>
							<p className="lead">
                           لا تقلق ان كنت نسيت كلمه المرور الخاصه بك 
							</p>
                         
                         <img className='forgetimg'  alt='doctor' src={Forget} width="300px"/>
						</div>
						<div className="card-1">
							<div className="card-body">
								<div className="m-sm-4">

									<form onSubmit={forgetPassword}>
										<div className="form-group" >
											<label>اسم المستخدم او البريد الالكتروني</label>
											<input className="form-control form-control-lg" required type="text" name="emailOrUsername" placeholder=" "/>
										</div>
										<div className="text-center mt-3">
											<button type="submit" className="btn btn-outline-success">استعادة كلمه المرور</button>
										</div>
									</form>


                                     {/* Alert */}
                                     
                                    {successForgetPassword !== null && !errorForgetPassword ?    
                                       <div className="alert alert-success"> <strong className="default"><i className="fa fa-hdd-o"></i>{successForgetPassword} </strong>
                                       <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
		                                </div>
                                    : null}

                                    {errorForgetPassword !== null ? 
                                        <div className="alert alert-warning">
                                        <strong className="default"><i className="fa fa-hdd-o"></i>{errorForgetPassword} </strong>
		                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
		                                </div>
                                    : null}								</div>
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