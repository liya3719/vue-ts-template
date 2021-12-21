import { Service } from 'typedi';
import { IMainInterface } from '../interface/IMainService';
import { CommonService } from './commonService';
import main from '../api/apis';
/**
 * 这是例子，可以删除
 */
@Service()
export class MainService implements IMainInterface {
    public getMain(): Promise<any> {
        return CommonService._get(main.main, {})
    }
}