// 'use client';

// import { decodeRedirectHash, getGeoInfo } from '@/utils/functions';
// import { useParams, useRouter } from 'next/navigation';
// import { useEffect } from "react";
// import { useFormStore } from '@/stores/formStore';
// import { recreateSession } from '@/server-actions/api.actions';

// const RedirectPage = () => {
//     const params = useParams();
//     // const router = useRouter();

//     // const sessionId = useFormStore.getState().sessionId;
//     // const formData = useFormStore.getState().formData;
//     // const setField = useFormStore.getState().setField;
//     // const setCurrentFormStep = useFormStore.getState().setCurrentFormStep;
//     // const setCurrentStepIndex = useFormStore.getState().setCurrentStepIndex;
//     // const updateStepHighlight = useFormStore.getState().updateStepHighlight;

//     // const setSessionId = useFormStore.getState().setSessionId;


//     useEffect(() => {
//         handle();
//     }, []);

//     async function handle() {
//         console.log(params , process.env);
//         alert("Tada");
        
//         // const data = decodeRedirectHash(
//         //     Array.isArray(params?.hash) ? params.hash[0] : params?.hash ?? ""
//         // );
//         // console.log("Decoded data", data , params);

//         // if (data) {
//         //     setField(data.key, data.value);

//         //     if (data.key == "selected_products") {
//         //         if (sessionId.length > 0) {
//         //             if (formData.country) {
//         //                 setCurrentFormStep(3);
//         //                 setCurrentStepIndex(2);
//         //                 updateStepHighlight("product");
//         //                 return router.push("/" + sessionId);
//         //             } else {
//         //                 setCurrentStepIndex(0);
//         //                 updateStepHighlight("info");
//         //                 return router.push("/" + sessionId);
//         //             }
//         //         }

//         //     }

//         //     if (data.key == "payment") {
//         //         setCurrentFormStep(3);
//         //         setCurrentStepIndex(2);
//         //         updateStepHighlight("product");
//         //         return router.push("/" + data.value);
//         //     }

//         //     if (data.key == "recreate_session") {
//         //         setField(data.key, "");

//         //         let response = await recreateSession(data.value.id,
//         //             data.value.token
//         //             , await getGeoInfo());
//         //         if (response.success) {
//         //             setCurrentStepIndex(0);
//         //             updateStepHighlight("info");
//         //             setSessionId('');
//         //             return router.push("/" + response.data.id);
//         //         }
//         //     }
//         // }
//         // return router.push("/");
//     }

//     return (
//         <>Redirecting</>
//     );
// };

// export default RedirectPage;
