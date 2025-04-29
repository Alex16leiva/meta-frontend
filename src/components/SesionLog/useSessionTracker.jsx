import { useEffect, useRef } from "react";
import { restClient } from "../../services/restClient";

const useSessionLog = () => {
    const sessionId = useRef(null);

    const startSession = async () => {
        const request = {

        }
        restClient.httpPost("sesionLog/inicio", request)
            .then(response => {
                sessionId.current = response.sesionUser;
            })
    };

    const endSession = async () => {
        if (!sessionId.current) return;
        const request = {
            sesionLog: {
                sesionUser: sessionId.current
            }
        }
        restClient.httpPost("sesionLog/fin", request)

    };

    useEffect(() => {

        startSession();

        window.addEventListener("beforeunload", endSession);

        return () => {
            endSession();
            window.removeEventListener("beforeunload", endSession);
        };
    }, []);

    return { endSession };
};

export default useSessionLog;
