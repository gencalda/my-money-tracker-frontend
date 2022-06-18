import useEventListener from './useEventListener';

const usePopoverToggle = (
  togglerRef: HTMLElement | null,
  popoverRef: HTMLElement | null,
  popOverStateToggler: (state?: boolean) => void
): void => {
  const onClickhandler = (event: any) => {
    if (!event || !togglerRef || !popoverRef) {
      return;
    }

    const isInsidePopOver = popoverRef?.contains?.(event.target);
    const isInsideToggler = togglerRef?.contains?.(event.target);
    const isTogglerClicked = !isInsidePopOver && isInsideToggler;
    const isPopoverClicked = isInsidePopOver && isInsideToggler;
    const isClickedOutside = !isInsidePopOver && !isInsideToggler;

    if (isPopoverClicked) {
      return;
    }

    if (isTogglerClicked) {
      popOverStateToggler?.();

      return;
    }

    if (isClickedOutside) {
      popOverStateToggler?.(false);
    }
  };

  useEventListener('click', onClickhandler, document);
};

export default usePopoverToggle;
