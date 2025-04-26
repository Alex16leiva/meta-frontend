import PropTypes from "prop-types";
export const FormattedDate = ({ dateString }) => {
    const date = new Date(dateString);
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div>
            <p> {formattedTime}</p>
        </div>
    );
};

FormattedDate.propTypes = {
    dateString: PropTypes.string.isRequired,
};