import { Service } from 'typedi';
import { IMainInterface } from '../interface/IMainService';
import { CommonService } from './commonService';
import main from '../api/apis';
/**
 * 系统设置service
 */
@Service()
export class MainService implements IMainInterface {
    public getMain(): Promise<any> {
        return CommonService._get(main.main, {})
    }
}