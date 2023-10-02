import { loadStyle } from "./asset.js";

class Dialog {
	anim = {
		props: {
			dialog: {
				open: { transform: ['translateY(-100%)', 'translateY(0)'], opacity: [0, 1] },
				close: { transform: ['translateY(0)', 'translateY(-100%)'], opacity: [1, 0] }
			}, parent: {
				open: { opacity: [0, 1] },
				close: { opacity: [1, 0] }
			}
		}, opts: {
			all: { duration: 300, fill: "forwards" }
		}
	};
	onParentClick = e => {
		if (e.target === this.parent) this.close();
	};

	constructor(elem) {
		loadStyle('dialog');
		this.elem = elem;
		this.parent = elem.parentElement;
	}
	open() {
		if (this.opened) return;
		this.parent.classList.add("open");
		const opts_p = this.anim.opts.parent?.open ?? this.anim.opts.parent ?? this.anim.opts.all,
			opts_d = this.anim.opts.dialog?.open ?? this.anim.opts.dialog ?? this.anim.opts.all;
		this.parent.animate(this.anim.props.parent.open, opts_p);
		this.elem.animate(this.anim.props.dialog.open, opts_d);
		setTimeout(() => this.opened = true, Math.max(opts_p.duration, opts_d.duration));
	}
	close() {
		if (!this.opened) return;
		this.opts_p = this.anim.opts.parent?.close ?? this.anim.opts.parent ?? this.anim.opts.all;
		this.opts_d = this.anim.opts.dialog?.close ?? this.anim.opts.dialog ?? this.anim.opts.all;
		this.parent.animate(this.anim.props.parent.close, this.opts_p);
		this.elem.animate(this.anim.props.dialog.close, this.opts_d);
		setTimeout(() => {
			this.parent.classList.remove("open");
			this.opened = false;
		}, Math.max(this.opts_p.duration, this.opts_d.duration));
	}
	set cancellable(v) {
		if (v) this.parent.addEventListener("click", this.onParentClick);
		else this.parent.removeEventListener("click", this.onParentClick);
		return this;
	}
}

export default Dialog;