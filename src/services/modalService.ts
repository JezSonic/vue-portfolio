import { type Component, createApp, h } from "vue";

export type ModalController = {
    open: () => void;
    close: () => void;
};

/**
 * Programmatically open a modal component from anywhere.
 *
 * The modal component can close itself by emitting a `close` event or by calling the injected `close` prop (if used).
 * @example
 * const modal = openModal(TwoFactorSetupModal, { qrSvg: svg, onConfirm: (code) => ... })
 * modal.open()
 * modal.close()
 */
export function configureModal(component: Component, props: Record<string, any> = {}): ModalController {
    let app: ReturnType<typeof createApp> | null = null;
    const container = document.createElement("div");
    container.setAttribute("data-programmatic-modal", "");
    let mounted = false;

    /**
     * Closes the component, unmounting it from the application and removing it from the DOM.
     * After a successful close, if an `onClosed` callback was provided via props, it will be invoked.
     */
    const close = () => {
        if (!mounted) return;
        mounted = false;
        if (app) {
            app.unmount();
            app = null;
        }
        if (container.parentNode) {
            container.parentNode.removeChild(container);
        }
        // Notify external logic that the modal has been fully closed
        try {
            const cb = (props && typeof props.onClosed === 'function') ? props.onClosed : null;
            if (cb) cb();
        } catch {
            // noop; avoid throwing during close path
        }
    };

    /**
     * Initializes the open state of the component and mounts it to the DOM.
     */
    const open = () => {
        if (mounted) return;
        mounted = true;
        document.body.appendChild(container);

        // Wire the modal's own `close` event to controller.close()
        const onClose = () => close();

        // Also provide a `close` prop so modal can call it directly if it prefers
        const vnodeProps = { ...props, onClose, close };

        app = createApp({
            render: () => h(component, vnodeProps)
        });

        app.mount(container);
    };

    return { open, close };
}
