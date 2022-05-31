import bezierEasing from "bezier-easing";
import ReactDOM from "react-dom";
import { Transition } from "react-spring/renderprops";

const RatioModal = ({
  renderContent,
  stopTransitioning,

  el,

  isTransitioning,
  isPicking,
}) => {
  return (
    (isTransitioning || isPicking) &&
    ReactDOM.createPortal(
      <Transition
        items={isPicking}
        onRest={(isOpen) => stopTransitioning()}
        config={{
          duration: 100,
          easing: bezierEasing(0.25, 0.1, 0.25, 1.0),
        }}
        from={{
          transform: "scale3d(0.95, 0.95, 1)",
          opacity: 0,
        }}
        enter={{
          transform: "scale3d(1, 1, 1)",
          opacity: 1,
        }}
        leave={{
          transform: "scale3d(0.95, 0.95, 1)",
          opacity: 0,
        }}
      >
        {(isPicking) =>
          isPicking &&
          ((props) => (
            <div
              style={props}
              className="ct-ratio-modal"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onMouseDownCapture={(e) => {
                e.nativeEvent.stopImmediatePropagation();
                e.nativeEvent.stopPropagation();
              }}
              onMouseUpCapture={(e) => {
                e.nativeEvent.stopImmediatePropagation();
                e.nativeEvent.stopPropagation();
              }}
            >
              {renderContent && renderContent()}
            </div>
          ))
        }
      </Transition>,
      el.current.closest(".ct-single-palette")
        ? el.current
          .closest(".ct-single-palette")
          .querySelector(".ct-color-modal-wrapper")
        : el.current.closest(".ct-color-modal-wrapper")
          ? el.current.closest(".ct-color-modal-wrapper")
          : el.current
            .closest(".ct-control")
            .querySelector(".ct-color-modal-wrapper")
    )
  );
};

export default RatioModal;
