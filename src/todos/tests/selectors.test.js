import {expect} from 'chai';
import { getCompletedTodos } from '../selectors';

describe("The completed todos selector",()=>{
    it('returns only completed todos',()=>{
        const fakeTodos= [{text:"hello",isCompleted:true},{text:"bye",isCompleted:false},{text:"climb everest",isCompleted:false}];
        const expected = [{text:"hello",isCompleted:true}];
        const actual = getCompletedTodos.resultFunc(fakeTodos);
        expect(actual).to.deep.equal(expected);
    });
});
