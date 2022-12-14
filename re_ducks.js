import {useReducer} from "react";

    function callFunction(func, ...args) { if(func && (typeof func==="function")) return func(...args); else return null; }
    
    function cloneObj(obj) { return JSON.parse(JSON.stringify(obj)); }

    function useRenderTrigger(tag='DEFAULT')
    {
        const [renderTriggerValue, triggerRerender] = useReducer( ()=>Math.random(), Math.random() );
        return triggerRerender;
    }
    
    function useObjectValueMutator(obj, prop, triggerRerender, preMutate=null, postMutate=null, checkableElement=false)
    {
        if(!triggerRerender) triggerRerender = useRenderTrigger('OBJ_VAL_MUT');
        
        const objValMutator = (e) => 
        {
            callFunction(preMutate);
            obj[prop] = (e.target!=undefined || e.target!=null) ? (checkableElement ? e.target.checked : e.target.value) : e;
            callFunction(postMutate);
            triggerRerender();
        };
        
        return objValMutator;
    }
    
    function useObjectMutator(obj, triggerRerender, preMutate=null, postMutate=null)
    {
        if(!triggerRerender) triggerRerender = useRenderTrigger('OBJ_MUT');
        
        const objMutator = (e, prop, checkableElement=false) => 
        {
            callFunction(preMutate);
            obj[prop] = (e.target!=undefined || e.target!=null) ? (checkableElement ? e.target.checked : e.target.value) : e;
            callFunction(postMutate);
            triggerRerender();
        };
        
        return objMutator;
    }
    
    function useObjectEntriesMutator(obj, triggerRerender, preMutate=null, postMutate=null)
    {
        if(!triggerRerender) triggerRerender = useRenderTrigger('OBJ_ENT_MUT');
        
        const objEntriesMutator = (newObj) => 
        {
            callFunction(preMutate);
            for(var k in newObj) obj[k] = newObj[k];
            callFunction(postMutate);
            triggerRerender();
        };
        
        return objEntriesMutator;
    }
    
    function useArrayMutator(arr=[], triggerRerender, defaultNewObjRef=null)
    {
        if(!triggerRerender) triggerRerender = useRenderTrigger('ARR_MUT');
        
        const actions = 
        {
            add             : (newObj, preMutate=null, postMutate=null) =>     { callFunction(preMutate); arr.push(newObj); callFunction(postMutate); triggerRerender(); },
            addClone        : (newObjRef, preMutate=null, postMutate=null) =>  { callFunction(preMutate); arr.push(cloneObj(newObjRef)); callFunction(postMutate); triggerRerender(); },
            addDefaultClone : (preMutate=null, postMutate=null) =>             { callFunction(preMutate); arr.push(cloneObj(defaultNewObjRef)); callFunction(postMutate); triggerRerender(); },
            update          : (newObj, i, preMutate=null, postMutate=null) =>  { callFunction(preMutate); arr[i]=newObj; callFunction(postMutate); triggerRerender(); },
            remove          : (i, preMutate=null, postMutate=null) =>          { callFunction(preMutate); var removedObjs = arr.splice(i, 1); callFunction(postMutate); triggerRerender(); return (removedObjs && removedObjs.length>0) ? removedObjs[0] : null; },
            reorder         : (iOld, iNew, preMutate=null, postMutate=null) => { callFunction(preMutate); var t=arr[iOld]; arr.splice(iOld, 1); arr.splice(iNew, 0, t); callFunction(postMutate); triggerRerender(); },
            swap            : (i, j, preMutate=null, postMutate=null) =>       { callFunction(preMutate); var t=arr[i]; arr[i]=arr[j]; arr[j]=t; callFunction(postMutate); triggerRerender(); },
            swapObjProp     : (i, j, propName='', preMutate=null, postMutate=null) => { callFunction(preMutate); if(i>=0 && i<arr.length && j>=0 && j<arr.length){var tempPropVal=arr[i][propName]; arr[i][propName]=arr[j][propName]; arr[j][propName]=tempPropVal;} callFunction(postMutate); triggerRerender(); }
        };
        
        return actions;
    }
    
    
const ReDucks = 
{
    'useRenderTrigger'             : useRenderTrigger,
    'useObjectValueMutator'        : useObjectValueMutator,
    'useObjectMutator'             : useObjectMutator,
    'useObjectEntriesMutator'      : useObjectEntriesMutator,
    'useArrayMutator'              : useArrayMutator,
};

export default ReDucks;
