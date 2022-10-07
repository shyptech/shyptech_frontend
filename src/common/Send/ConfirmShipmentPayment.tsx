import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ComponentHolder, ProgressTab } from "components";
import { shipmentProcess } from "redux/actions/ShipmentAction";
import ShipmentImage from "assets/svg/processing-price.svg";
import { classnames } from "utils";
import { ShipmentPaymentError } from "./ShipmentPaymentError";
import { ShipmentPaymentSuccess } from "./ShipmentPaymentSuccess";

export const ConfirmShipmentPayment: React.FC<{ reference?: string }> = ({ reference }) => {

    const dispatch = useDispatch();

    const [state, setState] = useState({
        beep: 0,
        errorTrigger: 0,
        success: false,
        animState: "idle",
        loading: false
    });

    const tabs = [
        { label: "Senders's Info", onClick: () => null },
        { label: "Receiver's Info", onClick: () => null },
        { label: "Item's Info", onClick: () => null },
        { label: "Payment Info", onClick: () => null },
    ];

    useEffect(() => {

        const paymentStatus = async () => {

            if (!reference) return;

            setState((prevState) => ({ ...prevState, animState: "start", loading: true }));

            const check = await dispatch(shipmentProcess("get-payment-status", { reference }, true));

            setState((prevState) => ({

                ...prevState,

                animState: "complete",

                loading: false,

                ...(check?.status === "failed" ? { errorTrigger: state.errorTrigger + 1 } : {}),

                ...(check?.status === "sucessful" ? { success: true } : {})


            }));

        };

        setTimeout(() => paymentStatus(), 1500);

        // eslint-disable-next-line
    }, [state.beep]);

    return (

        <>

            <ShipmentPaymentError trigger={state.errorTrigger} />

            <div>

                <ProgressTab

                    className={"mt-5"}

                    activeIndex={3}

                    tabs={tabs}

                />

                <ComponentHolder

                    // onPop={() => popProcess()} withPopButton={true}

                    visibility={!state.success}

                    className={"shipment-processing form-field-group slideUpInside"}

                >

                    <div className="router-scope">

                        <div className={classnames(`router-scope-line router-scope-${state.animState}`)} />

                    </div>

                    <h1> Please wait, your payment is Processing </h1>

                    <img src={ShipmentImage} alt={"processing"} className="margin-auto" />

                </ComponentHolder>

                <ShipmentPaymentSuccess reference={String(reference)} visibility={state.success === true} />

            </div>

        </>
    );

}