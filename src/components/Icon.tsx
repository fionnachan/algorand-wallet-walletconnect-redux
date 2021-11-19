import * as PropTypes from "prop-types";

const Icon = (props: any) => {
  const { src, fallback } = props;
  return (
    <img
      {...props}
      src={src}
      className="icon"
      onError={(event: any) => {
        if (fallback) {
          event.target.src = fallback;
        }
      }}
    />
  );
};

Icon.propTypes = {
  src: PropTypes.string,
  fallback: PropTypes.string,
  size: PropTypes.number,
};

Icon.defaultProps = {
  src: null,
  fallback: "",
  size: 20,
};

export default Icon;
