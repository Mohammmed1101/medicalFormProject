import React from "react";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton'



export default function EmailVerified() {

    const { token } = useParams()
    const [error, setError] = useState(false)
    const navigate = useNavigate()


    const verifyEmailToken = async () => {
        try {
            await axios.get(`/MyMediForm/auth/verify_email/${token}`)
            console.log("email verified")
            navigate("/login")
        } catch (error) {
            console.log(error.response.data)
            setError(true)
        }
    }

    useEffect(() => {
        verifyEmailToken()
    }, [])

    return error ? <h1>Verification failed </h1> : <>

        <Box sx={{
            width: 300,
            position: "absolute",
            top: "40%",
            left: "38%",
            textAlign: "center"
        }}>
            <Skeleton />
            <Skeleton aanimation="fitContent" />
            <Skeleton animation={false} />
        </Box>
    </>

}