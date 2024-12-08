'use client';

import { decodeRedirectHash } from '@/utils/functions';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from "react";
import { useFormStore } from '@/stores/formStore';

const RedirectPage = () => {
    const params = useParams();
    const router = useRouter();

    const sessionId = useFormStore.getState().sessionId;
    const formData = useFormStore.getState().formData;
    const setField = useFormStore.getState().setField;
    const setCurrentStepIndex = useFormStore.getState().setCurrentStepIndex;
    const updateStepHighlight = useFormStore.getState().updateStepHighlight;


    useEffect(() => {
        handle();
    }, []);

    function handle() {
        const hashValue = Array.isArray(params?.hash) ? params.hash[0] : params?.hash;
        const data = decodeRedirectHash(hashValue ?? "");

        if (data) {
            setField(data.key, data.value);

            if (data.key == "selected_products") {
                if (sessionId.length > 0) {
                    if (formData.country) {
                        setCurrentStepIndex(2);
                        updateStepHighlight("product");
                        return router.push("/" + sessionId);
                    } else {
                        setCurrentStepIndex(0);
                        updateStepHighlight("info");
                        return router.push("/" + sessionId);
                    }
                }

            }

            if (data.key == "payment") {
                setCurrentStepIndex(2);
                updateStepHighlight("product");
                return router.push("/" + data.value);
            }
        }
        return router.push("/");
    }

    return (
        <>Redirecting</>
    );
};

export default RedirectPage;
