const wasm = (() => {
  let wasm;

  const __wbg_get_2ce757bbb9988ab8_target =
    GoatsNs.get.bind(GoatsNs) ||
    function() {
      throw new Error(`wasm-bindgen: GoatsNs.get.bind(GoatsNs) does not exist`);
    };

  let cachedTextDecoder = new TextDecoder("utf-8");

  let cachegetUint8Memory = null;
  function getUint8Memory() {
    if (
      cachegetUint8Memory === null ||
      cachegetUint8Memory.buffer !== wasm.memory.buffer
    ) {
      cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
  }

  function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
  }

  const slab = [
    { obj: undefined },
    { obj: null },
    { obj: true },
    { obj: false }
  ];

  let slab_next = slab.length;

  function addHeapObject(obj) {
    if (slab_next === slab.length) slab.push(slab.length + 1);
    const idx = slab_next;
    const next = slab[idx];

    slab_next = next;

    slab[idx] = { obj, cnt: 1 };
    return idx << 1;
  }

  function __wbg_get_2ce757bbb9988ab8(arg0, arg1, arg2, arg3) {
    let varg0 = getStringFromWasm(arg0, arg1);
    let varg2 = getStringFromWasm(arg2, arg3);
    return addHeapObject(__wbg_get_2ce757bbb9988ab8_target(varg0, varg2));
  }

  const __wbg_get_8afbefd3accc7077_target =
    FavoritesNs.get.bind(FavoritesNs) ||
    function() {
      throw new Error(
        `wasm-bindgen: FavoritesNs.get.bind(FavoritesNs) does not exist`
      );
    };

  function __wbg_get_8afbefd3accc7077(arg0, arg1, arg2, arg3) {
    let varg0 = getStringFromWasm(arg0, arg1);
    let varg2 = getStringFromWasm(arg2, arg3);
    return addHeapObject(__wbg_get_8afbefd3accc7077_target(varg0, varg2));
  }

  const __wbg_put_4269264a4947ce72_target =
    FavoritesNs.put.bind(FavoritesNs) ||
    function() {
      throw new Error(
        `wasm-bindgen: FavoritesNs.put.bind(FavoritesNs) does not exist`
      );
    };

  function __wbg_put_4269264a4947ce72(arg0, arg1, arg2, arg3) {
    let varg0 = getStringFromWasm(arg0, arg1);
    let varg2 = getStringFromWasm(arg2, arg3);
    return addHeapObject(__wbg_put_4269264a4947ce72_target(varg0, varg2));
  }

  const __wbg_delete_42b051788bc6bc86_target =
    FavoritesNs.delete.bind(FavoritesNs) ||
    function() {
      throw new Error(
        `wasm-bindgen: FavoritesNs.delete.bind(FavoritesNs) does not exist`
      );
    };

  function __wbg_delete_42b051788bc6bc86(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(__wbg_delete_42b051788bc6bc86_target(varg0));
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

  function __wbg_fetch_3c8f4980be83ba4a(arg0) {
    return addHeapObject(fetch(getObject(arg0)));
  }

  let cachedTextEncoder = new TextEncoder("utf-8");

  function passStringToWasm(arg) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = wasm.__wbindgen_malloc(buf.length);
    getUint8Memory().set(buf, ptr);
    return [ptr, buf.length];
  }

  let cachegetUint32Memory = null;
  function getUint32Memory() {
    if (
      cachegetUint32Memory === null ||
      cachegetUint32Memory.buffer !== wasm.memory.buffer
    ) {
      cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
  }

  function __wbg_generaterandomstr_f4ba49766a789ec2(ret) {
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

  function __wbg_new_278751770e71d4dc(arg0, arg1, arg2) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Response(varg0, takeObject(arg2)));
  }
  /**
   * @param {any} arg0
   * @returns {any}
   */
  function main(arg0) {
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

  const __widl_f_request_FetchEvent_target = function() {
    return this.request;
  };

  function __widl_f_request_FetchEvent(arg0) {
    return addHeapObject(
      __widl_f_request_FetchEvent_target.call(getObject(arg0))
    );
  }

  function __widl_instanceof_FormData(idx) {
    return getObject(idx) instanceof FormData ? 1 : 0;
  }

  const __widl_f_get_FormData_target =
    FormData.prototype.get ||
    function() {
      throw new Error(`wasm-bindgen: FormData.prototype.get does not exist`);
    };

  function __widl_f_get_FormData(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    return addHeapObject(
      __widl_f_get_FormData_target.call(getObject(arg0), varg1)
    );
  }

  function __widl_f_new_Headers(exnptr) {
    try {
      return addHeapObject(new Headers());
    } catch (e) {
      const view = getUint32Memory();
      view[exnptr / 4] = 1;
      view[exnptr / 4 + 1] = addHeapObject(e);
    }
  }

  const __widl_f_append_Headers_target =
    Headers.prototype.append ||
    function() {
      throw new Error(`wasm-bindgen: Headers.prototype.append does not exist`);
    };

  function __widl_f_append_Headers(arg0, arg1, arg2, arg3, arg4, exnptr) {
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

  const __widl_f_get_Headers_target =
    Headers.prototype.get ||
    function() {
      throw new Error(`wasm-bindgen: Headers.prototype.get does not exist`);
    };

  function isLikeNone(x) {
    return x === undefined || x === null;
  }

  function __widl_f_get_Headers(ret, arg0, arg1, arg2, exnptr) {
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

  const __widl_f_set_Headers_target =
    Headers.prototype.set ||
    function() {
      throw new Error(`wasm-bindgen: Headers.prototype.set does not exist`);
    };

  function __widl_f_set_Headers(arg0, arg1, arg2, arg3, arg4, exnptr) {
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

  function __widl_f_new_with_str_Request(arg0, arg1, exnptr) {
    let varg0 = getStringFromWasm(arg0, arg1);
    try {
      return addHeapObject(new Request(varg0));
    } catch (e) {
      const view = getUint32Memory();
      view[exnptr / 4] = 1;
      view[exnptr / 4 + 1] = addHeapObject(e);
    }
  }

  const __widl_f_method_Request_target = function() {
    return this.method;
  };

  function __widl_f_method_Request(ret, arg0) {
    const [retptr, retlen] = passStringToWasm(
      __widl_f_method_Request_target.call(getObject(arg0))
    );
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;
  }

  const __widl_f_url_Request_target = function() {
    return this.url;
  };

  function __widl_f_url_Request(ret, arg0) {
    const [retptr, retlen] = passStringToWasm(
      __widl_f_url_Request_target.call(getObject(arg0))
    );
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;
  }

  const __widl_f_headers_Request_target = function() {
    return this.headers;
  };

  function __widl_f_headers_Request(arg0) {
    return addHeapObject(__widl_f_headers_Request_target.call(getObject(arg0)));
  }

  const __widl_f_form_data_Request_target =
    Request.prototype.formData ||
    function() {
      throw new Error(
        `wasm-bindgen: Request.prototype.formData does not exist`
      );
    };

  function __widl_f_form_data_Request(arg0, exnptr) {
    try {
      return addHeapObject(
        __widl_f_form_data_Request_target.call(getObject(arg0))
      );
    } catch (e) {
      const view = getUint32Memory();
      view[exnptr / 4] = 1;
      view[exnptr / 4 + 1] = addHeapObject(e);
    }
  }

  function __wbg_new_7a259c7860f1b5c4() {
    return addHeapObject(new Array());
  }

  function __wbg_new_d85589be79b6c4df(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Error(varg0));
  }

  function __wbg_instanceof_Function_220b2df285bee4ce(idx) {
    return getObject(idx) instanceof Function ? 1 : 0;
  }

  const __wbg_call_eeece939fc9a62db_target =
    Function.prototype.call ||
    function() {
      throw new Error(`wasm-bindgen: Function.prototype.call does not exist`);
    };

  function __wbg_call_eeece939fc9a62db(arg0, arg1, arg2, exnptr) {
    try {
      return addHeapObject(
        __wbg_call_eeece939fc9a62db_target.call(
          getObject(arg0),
          getObject(arg1),
          getObject(arg2)
        )
      );
    } catch (e) {
      const view = getUint32Memory();
      view[exnptr / 4] = 1;
      view[exnptr / 4 + 1] = addHeapObject(e);
    }
  }

  function __wbg_new_6b7f4334f7b728fd() {
    return addHeapObject(new Object());
  }

  const __wbg_get_b5fa2669cbf91d6f_target =
    Reflect.get.bind(Reflect) ||
    function() {
      throw new Error(`wasm-bindgen: Reflect.get.bind(Reflect) does not exist`);
    };

  function __wbg_get_b5fa2669cbf91d6f(arg0, arg1, exnptr) {
    try {
      return addHeapObject(
        __wbg_get_b5fa2669cbf91d6f_target(getObject(arg0), getObject(arg1))
      );
    } catch (e) {
      const view = getUint32Memory();
      view[exnptr / 4] = 1;
      view[exnptr / 4 + 1] = addHeapObject(e);
    }
  }

  const __wbg_set_6f4fee47694f666d_target =
    Reflect.set.bind(Reflect) ||
    function() {
      throw new Error(`wasm-bindgen: Reflect.set.bind(Reflect) does not exist`);
    };

  function __wbg_set_6f4fee47694f666d(arg0, arg1, arg2, exnptr) {
    try {
      return __wbg_set_6f4fee47694f666d_target(
        getObject(arg0),
        getObject(arg1),
        getObject(arg2)
      )
        ? 1
        : 0;
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

  function __wbg_new_ea60e716adf807fe(arg0) {
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

  const __wbg_reject_aa4c9a50081bb8a9_target =
    Promise.reject.bind(Promise) ||
    function() {
      throw new Error(
        `wasm-bindgen: Promise.reject.bind(Promise) does not exist`
      );
    };

  function __wbg_reject_aa4c9a50081bb8a9(arg0) {
    return addHeapObject(__wbg_reject_aa4c9a50081bb8a9_target(getObject(arg0)));
  }

  const __wbg_resolve_a96e53ca1abfddb3_target =
    Promise.resolve.bind(Promise) ||
    function() {
      throw new Error(
        `wasm-bindgen: Promise.resolve.bind(Promise) does not exist`
      );
    };

  function __wbg_resolve_a96e53ca1abfddb3(arg0) {
    return addHeapObject(
      __wbg_resolve_a96e53ca1abfddb3_target(getObject(arg0))
    );
  }

  const __wbg_then_074a42f44879a676_target =
    Promise.prototype.then ||
    function() {
      throw new Error(`wasm-bindgen: Promise.prototype.then does not exist`);
    };

  function __wbg_then_074a42f44879a676(arg0, arg1, arg2) {
    return addHeapObject(
      __wbg_then_074a42f44879a676_target.call(
        getObject(arg0),
        getObject(arg1),
        getObject(arg2)
      )
    );
  }

  function __wbindgen_object_clone_ref(idx) {
    // If this object is on the stack promote it to the heap.
    if ((idx & 1) === 1) return addHeapObject(getObject(idx));

    // Otherwise if the object is on the heap just bump the
    // refcount and move on
    const val = slab[idx >> 1];
    val.cnt += 1;
    return idx;
  }

  function __wbindgen_object_drop_ref(i) {
    dropRef(i);
  }

  function __wbindgen_string_new(p, l) {
    return addHeapObject(getStringFromWasm(p, l));
  }

  function __wbindgen_number_new(i) {
    return addHeapObject(i);
  }

  function __wbindgen_number_get(n, invalid) {
    let obj = getObject(n);
    if (typeof obj === "number") return obj;
    getUint8Memory()[invalid] = 1;
    return 0;
  }

  function __wbindgen_is_null(idx) {
    return getObject(idx) === null ? 1 : 0;
  }

  function __wbindgen_is_undefined(idx) {
    return getObject(idx) === undefined ? 1 : 0;
  }

  function __wbindgen_boolean_get(i) {
    let v = getObject(i);
    if (typeof v === "boolean") {
      return v ? 1 : 0;
    } else {
      return 2;
    }
  }

  function __wbindgen_is_symbol(i) {
    return typeof getObject(i) === "symbol" ? 1 : 0;
  }

  function __wbindgen_string_get(i, len_ptr) {
    let obj = getObject(i);
    if (typeof obj !== "string") return 0;
    const [ptr, len] = passStringToWasm(obj);
    getUint32Memory()[len_ptr / 4] = len;
    return ptr;
  }

  function __wbindgen_cb_drop(i) {
    const obj = getObject(i).original;
    dropRef(i);
    if (obj.cnt-- == 1) {
      obj.a = 0;
      return 1;
    }
    return 0;
  }

  function __wbindgen_json_serialize(idx, ptrptr) {
    const [ptr, len] = passStringToWasm(JSON.stringify(getObject(idx)));
    getUint32Memory()[ptrptr / 4] = ptr;
    return len;
  }

  function __wbindgen_closure_wrapper322(a, b, fi, di, _ignored) {
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

  function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
  }

  const importObject = {
    "./the_best_goats": {
      __wbindgen_object_drop_ref,
      __wbindgen_closure_wrapper322,
      __wbg_get_2ce757bbb9988ab8,
      __wbg_get_8afbefd3accc7077,
      __wbg_new_278751770e71d4dc,
      __wbg_put_4269264a4947ce72,
      __wbg_delete_42b051788bc6bc86,
      __wbg_generaterandomstr_f4ba49766a789ec2,
      __wbg_fetch_3c8f4980be83ba4a,
      __wbindgen_json_serialize,
      __widl_f_request_FetchEvent,
      __widl_instanceof_FormData,
      __widl_f_get_FormData,
      __widl_f_new_Headers,
      __widl_f_append_Headers,
      __widl_f_get_Headers,
      __widl_f_set_Headers,
      __widl_f_new_with_str_Request,
      __widl_f_method_Request,
      __widl_f_url_Request,
      __widl_f_headers_Request,
      __widl_f_form_data_Request,
      __wbindgen_string_new,
      __wbindgen_cb_drop,
      __wbg_get_b5fa2669cbf91d6f,
      __wbg_new_7a259c7860f1b5c4,
      __wbg_new_d85589be79b6c4df,
      __wbg_instanceof_Function_220b2df285bee4ce,
      __wbg_call_eeece939fc9a62db,
      __wbg_new_6b7f4334f7b728fd,
      __wbg_set_6f4fee47694f666d,
      __wbg_new_ea60e716adf807fe,
      __wbg_reject_aa4c9a50081bb8a9,
      __wbg_resolve_a96e53ca1abfddb3,
      __wbg_then_074a42f44879a676,
      __wbindgen_number_get,
      __wbindgen_string_get,
      __wbindgen_boolean_get,
      __wbindgen_object_clone_ref,
      __wbindgen_is_null,
      __wbindgen_is_undefined,
      __wbindgen_is_symbol,
      __wbindgen_throw,
      __wbindgen_number_new
    }
  };

  const inst = new WebAssembly.Instance(WASM, importObject);
  wasm = inst.exports;

  return { main };
})();

// async function fetchGoats() {
//   const names = [
//     "Bailey",
//     "Bella",
//     "Max",
//     "Lucy",
//     "Charlie",
//     "Molly",
//     "Buddy",
//     "Daisy",
//     "Rocky",
//     "Maggie",
//     "Jake",
//     "Sophie",
//     "Jack",
//     "Sadie",
//     "Toby",
//     "Chloe",
//     "Cody",
//     "Bailey",
//     "Buster",
//     "Lola",
//     "Duke",
//     "Zoe",
//     "Cooper",
//     "Abby",
//     "Riley",
//     "Ginger",
//     "Harley",
//     "Roxy",
//     "Bear",
//     "Gracie",
//     "Tucker",
//     "Coco",
//     "Murphy",
//     "Sasha",
//     "Lucky",
//     "Lily",
//     "Oliver",
//     "Angel",
//     "Sam",
//     "Princess",
//     "Oscar",
//     "Emma",
//     "Teddy",
//     "Annie"
//   ];

//   return names.map((name, i) => {
//     const id = i + 1;
//     const imageId = String(id).padStart(4, "0");
//     return {
//       id,
//       name: name,
//       image: `/images/goat-${imageId}.jpg`,
//       imageSmall: `/images/goat-${imageId}-small.jpg`
//     };
//   });
// }

// async function fetchFavorites(userId) {
//   return [3, 6];
// }

// async function saveFavorites(userId) {}

// async function deleteFavorites(userId) {}

function generate_random_str() {
  function getRandomSymbol(symbol) {
    let array;

    if (symbol === "y") {
      array = ["8", "9", "a", "b"];
      return array[Math.floor(Math.random() * array.length)];
    }

    array = new Uint8Array(1);
    crypto.getRandomValues(array);
    return (array[0] % 16).toString(16);
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    getRandomSymbol
  );
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  try {
    return await wasm.main(event);
  } catch (e) {
    return new Response(e.stack || e.message || e || "unknown error", {
      status: 500
    });
  }
}
