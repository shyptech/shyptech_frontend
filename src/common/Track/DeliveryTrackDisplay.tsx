import React from "react";
import { AssignedIcon, DeliveredIcon, EnRouteIcon, PendingIcon, ProgressTab, ViewFormatter } from "components";
import { numberFormat } from "utils";

export const DeliveryTrackDisplay: React.FC<Props> = ({ trackingId , track }) => {

    const currentProgress = Array.isArray(track?.data?.shipmentHistories) ? track?.data?.shipmentHistories : [];

    const data = [

        { title: "Sender's Address", value: track?.data?.senderAddress },

        { title: "Sender's Name", value: track?.data?.senderName },

        { title: "Receiver's Address", value: track?.data?.receieverAddress },

        { title: "Receiver's Name", value: track?.data?.receieverName },

        { title: "Tracking ID", value: trackingId || "------" },

    ];

    const progressData = [
        {

            label: "Pending",

            svgString: PendingIcon,

        },

        {

            label: "Assigned",

            svgString: AssignedIcon,

        },

        {

            label: "Enroute",

            svgString: EnRouteIcon,

        },

        {

            label: "Delivered",

            svgString: DeliveredIcon,

        }

    ];

    return (

        <>

            <ViewFormatter

                wrapperClass="track-delivery-summary-amount"

                className="reverse"

                value={ trackingId || "-----"}

                title={"Tracking ID"}

            />

            <ProgressTab

                className={"mt-5"}

                activeIndex={currentProgress?.[currentProgress.length - 1]?.shippingStatus}

                tabs={progressData}

                withSvg={true}

            />

            <div className="form-field-group track-delivery-summary">

                <h2 className="text-center color-primary mb-5"> Delivery Details </h2>

                {data.map((item, index) =>

                    <ViewFormatter {...item} key={`track-detail-${index}`} />

                )}

                <ViewFormatter

                    wrapperClass="track-delivery-summary-amount"

                    title="Amount Paid"

                    value={numberFormat(0.00)}

                />

            </div>

        </>

    )

}

interface Props {

    trackingId?: string,

    track?: any

}