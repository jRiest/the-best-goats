/* tslint:disable */
import * as wasm from './the_best_goats_bg';

const __wbg_get_1ad4d2db49040ba1_target = GoatsNs.get.bind(GoatsNs) || function() {
    throw new Error(`wasm-bindgen: GoatsNs.get.bind(GoatsNs) does not exist`);
};

let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

const slab = [{ obj: undefined }, { obj: null }, { obj: true }, { obj: false }];

let slab_next = slab.length;

function addHeapObject(obj) {
    if (slab_next === slab.length) slab.push(slab.length + 1);
    const idx = slab_next;
    const next = slab[idx];

    slab_next = next;

    slab[idx] = { obj, cnt: 1 };
    return idx << 1;
}

export function __wbg_get_1ad4d2db49040ba1(arg0, arg1, arg2, arg3) {
    let varg0 = getStringFromWasm(arg0, arg1);
    let varg2 = getStringFromWasm(arg2, arg3);
    return addHeapObject(__wbg_get_1ad4d2db49040ba1_target(varg0, varg2));
}

const __wbg_get_12b964c474bf3917_target = FavoritesNs.get.bind(FavoritesNs) || function() {
    throw new Error(`wasm-bindgen: FavoritesNs.get.bind(FavoritesNs) does not exist`);
};

export function __wbg_get_12b964c474bf3917(arg0, arg1, arg2, arg3) {
    let varg0 = getStringFromWasm(arg0, arg1);
    let varg2 = getStringFromWasm(arg2, arg3);
    return addHeapObject(__wbg_get_12b964c474bf3917_target(varg0, varg2));
}

const __wbg_put_93f63b3eb926f515_target = FavoritesNs.put.bind(FavoritesNs) || function() {
    throw new Error(`wasm-bindgen: FavoritesNs.put.bind(FavoritesNs) does not exist`);
};

export function __wbg_put_93f63b3eb926f515(arg0, arg1, arg2, arg3) {
    let varg0 = getStringFromWasm(arg0, arg1);
    let varg2 = getStringFromWasm(arg2, arg3);
    return addHeapObject(__wbg_put_93f63b3eb926f515_target(varg0, varg2));
}

const __wbg_delete_9fa50bcc3ac28ee0_target = FavoritesNs.delete.bind(FavoritesNs) || function() {
    throw new Error(`wasm-bindgen: FavoritesNs.delete.bind(FavoritesNs) does not exist`);
};

export function __wbg_delete_9fa50bcc3ac28ee0(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(__wbg_delete_9fa50bcc3ac28ee0_target(varg0));
}

const stack = [];

function getObject(idx) {
    if ((idx & 1) === 1) {
        return stack[idx >> 1];
    } else {
        const val = slab[idx >> 1];

        return val.obj;

    }
}

export function __wbg_fetch_f97f38a52d09543e(arg0) {
    return addHeapObject(fetch(getObject(arg0)));
}

let cachedTextEncoder = new TextEncoder('utf-8');

function passStringToWasm(arg) {

    const buf = cachedTextEncoder.encode(arg);
    const ptr = wasm.__wbindgen_malloc(buf.length);
    getUint8Memory().set(buf, ptr);
    return [ptr, buf.length];
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

export function __wbg_generaterandomstr_8cd4e7c7c72c5d6f(ret) {

    const [retptr, retlen] = passStringToWasm(generate_random_str());
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}

function dropRef(idx) {

    idx = idx >> 1;
    if (idx < 4) return;
    let obj = slab[idx];

    obj.cnt -= 1;
    if (obj.cnt > 0) return;

    // If we hit 0 then free up our space in the slab
    slab[idx] = slab_next;
    slab_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropRef(idx);
    return ret;
}

export function __wbg_new_0a15fc7e3d759804(arg0, arg1, arg2) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Response(varg0, takeObject(arg2)));
}
/**
* @param {any} arg0
* @returns {any}
*/
export function main(arg0) {
    return takeObject(wasm.main(addHeapObject(arg0)));
}

function GetOwnOrInheritedPropertyDescriptor(obj, id) {
    while (obj) {
        let desc = Object.getOwnPropertyDescriptor(obj, id);
        if (desc) return desc;
        obj = Object.getPrototypeOf(obj);
    }
    throw new Error(`descriptor for id='${id}' not found`);
}

const __widl_f_request_FetchEvent_target = GetOwnOrInheritedPropertyDescriptor(FetchEvent.prototype, 'request').get || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(FetchEvent.prototype, 'request').get does not exist`);
};

export function __widl_f_request_FetchEvent(arg0) {
    return addHeapObject(__widl_f_request_FetchEvent_target.call(getObject(arg0)));
}

export function __widl_instanceof_FormData(idx) {
    return getObject(idx) instanceof FormData ? 1 : 0;
}

const __widl_f_get_FormData_target = FormData.prototype.get || function() {
    throw new Error(`wasm-bindgen: FormData.prototype.get does not exist`);
};

export function __widl_f_get_FormData(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    return addHeapObject(__widl_f_get_FormData_target.call(getObject(arg0), varg1));
}

export function __widl_f_new_Headers(exnptr) {
    try {
        return addHeapObject(new Headers());
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

const __widl_f_append_Headers_target = Headers.prototype.append || function() {
    throw new Error(`wasm-bindgen: Headers.prototype.append does not exist`);
};

export function __widl_f_append_Headers(arg0, arg1, arg2, arg3, arg4, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    let varg3 = getStringFromWasm(arg3, arg4);
    try {
        __widl_f_append_Headers_target.call(getObject(arg0), varg1, varg3);
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

const __widl_f_get_Headers_target = Headers.prototype.get || function() {
    throw new Error(`wasm-bindgen: Headers.prototype.get does not exist`);
};

function isLikeNone(x) {
    return x === undefined || x === null;
}

export function __widl_f_get_Headers(ret, arg0, arg1, arg2, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {
        const val = __widl_f_get_Headers_target.call(getObject(arg0), varg1);
        const [retptr, retlen] = isLikeNone(val) ? [0, 0] : passStringToWasm(val);
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

const __widl_f_set_Headers_target = Headers.prototype.set || function() {
    throw new Error(`wasm-bindgen: Headers.prototype.set does not exist`);
};

export function __widl_f_set_Headers(arg0, arg1, arg2, arg3, arg4, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    let varg3 = getStringFromWasm(arg3, arg4);
    try {
        __widl_f_set_Headers_target.call(getObject(arg0), varg1, varg3);
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

export function __widl_f_new_with_str_Request(arg0, arg1, exnptr) {
    let varg0 = getStringFromWasm(arg0, arg1);
    try {
        return addHeapObject(new Request(varg0));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

const __widl_f_method_Request_target = GetOwnOrInheritedPropertyDescriptor(Request.prototype, 'method').get || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(Request.prototype, 'method').get does not exist`);
};

export function __widl_f_method_Request(ret, arg0) {

    const [retptr, retlen] = passStringToWasm(__widl_f_method_Request_target.call(getObject(arg0)));
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}

const __widl_f_url_Request_target = GetOwnOrInheritedPropertyDescriptor(Request.prototype, 'url').get || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(Request.prototype, 'url').get does not exist`);
};

export function __widl_f_url_Request(ret, arg0) {

    const [retptr, retlen] = passStringToWasm(__widl_f_url_Request_target.call(getObject(arg0)));
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}

const __widl_f_headers_Request_target = GetOwnOrInheritedPropertyDescriptor(Request.prototype, 'headers').get || function() {
    throw new Error(`wasm-bindgen: GetOwnOrInheritedPropertyDescriptor(Request.prototype, 'headers').get does not exist`);
};

export function __widl_f_headers_Request(arg0) {
    return addHeapObject(__widl_f_headers_Request_target.call(getObject(arg0)));
}

const __widl_f_form_data_Request_target = Request.prototype.formData || function() {
    throw new Error(`wasm-bindgen: Request.prototype.formData does not exist`);
};

export function __widl_f_form_data_Request(arg0, exnptr) {
    try {
        return addHeapObject(__widl_f_form_data_Request_target.call(getObject(arg0)));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

export function __wbg_new_7a259c7860f1b5c4() {
    return addHeapObject(new Array());
}

export function __wbg_new_d85589be79b6c4df(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Error(varg0));
}

export function __wbg_instanceof_Function_220b2df285bee4ce(idx) {
    return getObject(idx) instanceof Function ? 1 : 0;
}

const __wbg_call_eeece939fc9a62db_target = Function.prototype.call || function() {
    throw new Error(`wasm-bindgen: Function.prototype.call does not exist`);
};

export function __wbg_call_eeece939fc9a62db(arg0, arg1, arg2, exnptr) {
    try {
        return addHeapObject(__wbg_call_eeece939fc9a62db_target.call(getObject(arg0), getObject(arg1), getObject(arg2)));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

export function __wbg_new_6b7f4334f7b728fd() {
    return addHeapObject(new Object());
}

const __wbg_get_b5fa2669cbf91d6f_target = Reflect.get.bind(Reflect) || function() {
    throw new Error(`wasm-bindgen: Reflect.get.bind(Reflect) does not exist`);
};

export function __wbg_get_b5fa2669cbf91d6f(arg0, arg1, exnptr) {
    try {
        return addHeapObject(__wbg_get_b5fa2669cbf91d6f_target(getObject(arg0), getObject(arg1)));
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

const __wbg_set_6f4fee47694f666d_target = Reflect.set.bind(Reflect) || function() {
    throw new Error(`wasm-bindgen: Reflect.set.bind(Reflect) does not exist`);
};

export function __wbg_set_6f4fee47694f666d(arg0, arg1, arg2, exnptr) {
    try {
        return __wbg_set_6f4fee47694f666d_target(getObject(arg0), getObject(arg1), getObject(arg2)) ? 1 : 0;
    } catch (e) {
        const view = getUint32Memory();
        view[exnptr / 4] = 1;
        view[exnptr / 4 + 1] = addHeapObject(e);

    }
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    }
    return cachedGlobalArgumentPtr;
}

function getGlobalArgument(arg) {
    const idx = globalArgumentPtr() / 4 + arg;
    return getUint32Memory()[idx];
}

export function __wbg_new_ea60e716adf807fe(arg0) {
    let cbarg0 = function(arg0, arg1) {
        let a = this.a;
        this.a = 0;
        try {
            return this.f(a, this.b, addHeapObject(arg0), addHeapObject(arg1));

        } finally {
            this.a = a;

        }

    };
    cbarg0.f = wasm.__wbg_function_table.get(arg0);
    cbarg0.a = getGlobalArgument(0);
    cbarg0.b = getGlobalArgument(0 + 1);
    try {
        return addHeapObject(new Promise(cbarg0.bind(cbarg0)));
    } finally {
        cbarg0.a = cbarg0.b = 0;

    }
}

const __wbg_reject_aa4c9a50081bb8a9_target = Promise.reject.bind(Promise) || function() {
    throw new Error(`wasm-bindgen: Promise.reject.bind(Promise) does not exist`);
};

export function __wbg_reject_aa4c9a50081bb8a9(arg0) {
    return addHeapObject(__wbg_reject_aa4c9a50081bb8a9_target(getObject(arg0)));
}

const __wbg_resolve_a96e53ca1abfddb3_target = Promise.resolve.bind(Promise) || function() {
    throw new Error(`wasm-bindgen: Promise.resolve.bind(Promise) does not exist`);
};

export function __wbg_resolve_a96e53ca1abfddb3(arg0) {
    return addHeapObject(__wbg_resolve_a96e53ca1abfddb3_target(getObject(arg0)));
}

const __wbg_then_074a42f44879a676_target = Promise.prototype.then || function() {
    throw new Error(`wasm-bindgen: Promise.prototype.then does not exist`);
};

export function __wbg_then_074a42f44879a676(arg0, arg1, arg2) {
    return addHeapObject(__wbg_then_074a42f44879a676_target.call(getObject(arg0), getObject(arg1), getObject(arg2)));
}

export function __wbindgen_object_clone_ref(idx) {
    // If this object is on the stack promote it to the heap.
    if ((idx & 1) === 1) return addHeapObject(getObject(idx));

    // Otherwise if the object is on the heap just bump the
    // refcount and move on
    const val = slab[idx >> 1];
    val.cnt += 1;
    return idx;
}

export function __wbindgen_object_drop_ref(i) {
    dropRef(i);
}

export function __wbindgen_string_new(p, l) {
    return addHeapObject(getStringFromWasm(p, l));
}

export function __wbindgen_number_new(i) {
    return addHeapObject(i);
}

export function __wbindgen_number_get(n, invalid) {
    let obj = getObject(n);
    if (typeof(obj) === 'number') return obj;
    getUint8Memory()[invalid] = 1;
    return 0;
}

export function __wbindgen_is_null(idx) {
    return getObject(idx) === null ? 1 : 0;
}

export function __wbindgen_is_undefined(idx) {
    return getObject(idx) === undefined ? 1 : 0;
}

export function __wbindgen_boolean_get(i) {
    let v = getObject(i);
    if (typeof(v) === 'boolean') {
        return v ? 1 : 0;
    } else {
        return 2;
    }
}

export function __wbindgen_is_symbol(i) {
    return typeof(getObject(i)) === 'symbol' ? 1 : 0;
}

export function __wbindgen_string_get(i, len_ptr) {
    let obj = getObject(i);
    if (typeof(obj) !== 'string') return 0;
    const [ptr, len] = passStringToWasm(obj);
    getUint32Memory()[len_ptr / 4] = len;
    return ptr;
}

export function __wbindgen_cb_drop(i) {
    const obj = getObject(i).original;
    dropRef(i);
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return 1;
    }
    return 0;
}

export function __wbindgen_json_serialize(idx, ptrptr) {
    const [ptr, len] = passStringToWasm(JSON.stringify(getObject(idx)));
    getUint32Memory()[ptrptr / 4] = ptr;
    return len;
}

export function __wbindgen_closure_wrapper321(a, b, fi, di, _ignored) {
    const f = wasm.__wbg_function_table.get(fi);
    const d = wasm.__wbg_function_table.get(di);
    const cb = function(arg0) {
        this.cnt++;
        let a = this.a;
        this.a = 0;
        try {
            return f(a, b, addHeapObject(arg0));

        } finally {
            this.a = a;
            if (this.cnt-- == 1) d(this.a, b);

        }

    };
    cb.a = a;
    cb.cnt = 1;
    let real = cb.bind(cb);
    real.original = cb;
    return addHeapObject(real);
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

