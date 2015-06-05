package com.trs.jsyspw;

/**
 * <p>Title:        TRS WCM</p>
 * <p>Copyright:    Copyright (c) 2004</p>
 * <p>Company:      www.trs.com.cn</p>
 * @author			wangjiang
 * @copyright		www.trs.com.cn
 * @created by		XWCMAutoTool 2.12
 * @version			5.2
 *
 * <p>Created:         2014/10/31 10:06:25</p>
 * <p>Last Modified:   2014/10/31 13:44:25</p>
 * <p>Description:
 *      class Purchase —— Purchase对象的定义和实现</p>
 * <p>Update Logs:
 *		[1] wangjiang@2014/10/31 10:06:25 创建对象
 *		[2] 
 */

import com.trs.cms.auth.persistent.User;
import com.trs.cms.content.CMSObj;
import com.trs.infra.common.WCMException;
import com.trs.infra.persistent.BaseObj;
import com.trs.infra.util.ExceptionNumber;
import com.trs.infra.util.database.CDBText;

import com.trs.infra.util.*;
import com.trs.infra.util.database.*;

public class Purchase extends CMSObj{

    /** 对象类型编号 */
    public final static int     OBJ_TYPE      = 512156927;

    /** 对象数据存储的数据库名 */
    public final static String  DB_TABLE_NAME = "XWCMPURCHASE";

	/** 对象数据存储的ID字段名 */
    public final static String  DB_ID_NAME    = "PURCHASEID";

    /** 构造函数：保留默认接口 */
    public Purchase(){
        super();
    }

//==============================================================================
//重载父类中的抽象接口函数

    /**
     * 取对象数据存储的数据表名称
     * @return 对象数据存储的数据表名称
     */
    public String getDbTableName(){
        return DB_TABLE_NAME;
    }

    /**
     * 取对象数据存储的ID字段名
     * @return  ID字段名
     */
    public String getIdFieldName(){
        return DB_ID_NAME;
    }

    /**
     * 取得该对象的类型编号
     * @return 对象的类型编号
     */
    public int getWCMType(){
        return OBJ_TYPE;
    }

//==============================================================================
//属性读写操作


 /**
  * 提取属性：Purtitle
   * @return  Purtitle
   */
  public String getPurtitle(){
       return this.getPropertyAsString("PURTITLE");   
}

  /**
   * 设置属性：Purtitle
   * @param	_sPurtitle 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setPurtitle( String _sPurtitle ) throws WCMException{
      return this.setProperty("PURTITLE", _sPurtitle ); 
  }

 /**
  * 提取属性：Purnum
   * @return  Purnum
   */
  public int getPurnum(){
       return this.getPropertyAsInt("PURNUM",0);   
}

  /**
   * 设置属性：Purnum
   * @param	_nPurnum 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setPurnum( int _nPurnum ) throws WCMException{
      return this.setProperty("PURNUM", _nPurnum ); 
  }

 /**
  * 提取属性：Purtype
   * @return  Purtype
   */
  public String getPurtype(){
       return this.getPropertyAsString("PURTYPE");   
}

  /**
   * 设置属性：Purtype
   * @param	_sPurtype 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setPurtype( String _sPurtype ) throws WCMException{
      return this.setProperty("PURTYPE", _sPurtype ); 
  }

 /**
  * 提取属性：Purpricelow
   * @return  Purpricelow
   */
  public int getPurpricelow(){
       return this.getPropertyAsInt("PURPRICE",0);   
}

  /**
   * 设置属性：Purpricelow
   * @param	_nPurpricelow 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setPurpricelow( int _nPurpricelow ) throws WCMException{
      return this.setProperty("PURPRICE", _nPurpricelow ); 
  }

 /**
  * 提取属性：Purdesc
   * @return  Purdesc
   */
  public String getPurdesc(){
       return this.getPropertyAsString("PURDESC");   
}

  /**
   * 设置属性：Purdesc
   * @param	_sPurdesc 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setPurdesc( String _sPurdesc ) throws WCMException{
      return this.setProperty("PURDESC", _sPurdesc ); 
  }

 /**
  * 提取属性：Purovertime
   * @return  Purovertime
   */
  public CMyDateTime getPurovertime(){
       return (CMyDateTime)this.getProperty("PUROVERTIME");   
}

  /**
   * 设置属性：Purovertime
   * @param	_dtPurovertime 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setPurovertime( CMyDateTime _dtPurovertime ) throws WCMException{
      return this.setProperty("PUROVERTIME", _dtPurovertime ); 
  }

 /**
  * 提取属性：Contact
   * @return  Contact
   */
  public String getContact(){
       return this.getPropertyAsString("CONTACT");   
}

  /**
   * 设置属性：Contact
   * @param	_sContact 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setContact( String _sContact ) throws WCMException{
      return this.setProperty("CONTACT", _sContact ); 
  }

 /**
  * 提取属性：Contactphone
   * @return  Contactphone
   */
  public String getContactphone(){
       return this.getPropertyAsString("CONTACTPHONE");   
}

  /**
   * 设置属性：Contactphone
   * @param	_sContactphone 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setContactphone( String _sContactphone ) throws WCMException{
      return this.setProperty("CONTACTPHONE", _sContactphone ); 
  }

 /**
  * 提取属性：Email
   * @return  Email
   */
  public String getEmail(){
       return this.getPropertyAsString("EMAIL");   
}

  /**
   * 设置属性：Email
   * @param	_sEmail 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setEmail( String _sEmail ) throws WCMException{
      return this.setProperty("EMAIL", _sEmail ); 
  }

 /**
  * 提取属性：Purpricehigh
   * @return  Purpricehigh
   */
  public int getPurpricehigh(){
       return this.getPropertyAsInt("PURPRICEHIGH",0);   
}

  /**
   * 设置属性：Purpricehigh
   * @param	_nPurpricehigh 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setPurpricehigh( int _nPurpricehigh ) throws WCMException{
      return this.setProperty("PURPRICEHIGH", _nPurpricehigh ); 
  }

  /** 属性：CrUser  创建用户
   *  由父类WCMObj提供接口支持。 
   */

  /** 属性：CrTime 创建时间
   *  由父类WCMObj提供接口支持。 
   */


//==============================================================================
//数据库操作

    /**
     * 检验对象数据有效性
     * @return 若对象数据设置有效，则返回true；否则返回false.
     * @throws WCMException  对象属性设置不完整，或属性值不正确，或对象重复，会抛出异常。
     */
    public boolean isValid() throws WCMException{
        if( isAddMode() ){
			//检查非空属性是否设置
			
 if( getProperty("PURTITLE")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"属性Purtitle没有设置(Purchase.isValid)"); 
             }
 if( getProperty("PURNUM")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"属性Purnum没有设置(Purchase.isValid)"); 
             }
 if( getProperty("PURTYPE")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"属性Purtype没有设置(Purchase.isValid)"); 
             }
 if( getProperty("PURPRICE")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"属性Purpricelow没有设置(Purchase.isValid)"); 
             }
 if( getProperty("PURDESC")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"属性Purdesc没有设置(Purchase.isValid)"); 
             }
 if( getProperty("PUROVERTIME")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"属性Purovertime没有设置(Purchase.isValid)"); 
             }
 if( getProperty("CONTACT")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"属性Contact没有设置(Purchase.isValid)"); 
             }
 if( getProperty("CONTACTPHONE")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"属性Contactphone没有设置(Purchase.isValid)"); 
             }
 if( getProperty("EMAIL")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"属性Email没有设置(Purchase.isValid)"); 
             }
 if( getProperty("PURPRICEHIGH")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"属性Purpricehigh没有设置(Purchase.isValid)"); 
             }
        }
        else{  //编辑模式，属性设置时，已经做了校验！
            if( ! this.isModified()){
                throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_MODIFIED,
					"对象属性没有更改(Purchase.isValid)" );
            }
        }//end if

		return true;
    }//END: isValid()


    /**
     * 将对象数据写入数据库
     * @param _currUser  当前操作用户
     * @throws WCMException  写入数据失败，会抛出异常。
     */
    public void insert( User _currUser ) throws WCMException{
        if ( isAddMode() && this.isModified() ){
			//设置属性的缺省值
			


            super.insert( _currUser );  //insert into Db
        }//end if
    }

    //==============================================================================
    //逻辑操作

    /**
     * 提取指定ID的对象
     * 
     * @param _nId
     *            指定的对象ID
     * @return 若找到指定ID的对象，则返回对象实体；否则，返回null。
     * @throws WCMException
     *             若提取对象失败，会抛出异常。
     */
    public final static Purchase findById(int _nId) throws WCMException {
        //检测ID的有效性
        if (_nId <= 0) {
            return null;
        }

        //提取指定ID的对象
        return (Purchase) BaseObj.findById(Purchase.class, _nId);

    }//END: findById()

    /**
     * 产生当前对象[Purchase]的实例
     * 
     * @return 当前对象的实例[Purchase]
     * @throws WCMException
     */
    public final static Purchase createNewInstance() throws WCMException {
        return (Purchase) BaseObj.createNewInstance(Purchase.class);
    }

    /**
     * 提取指定缓冲区Key的对象
     * 
     * @param _oKey
     *            指定缓冲区的Key
     * @return 若找到缓冲区Key的对象，则返回对象实体；否则，返回null。
     * @throws WCMException
     *             若提取对象失败，会抛出异常。
     */
    public final static Purchase findByKey(Object _oKey) throws WCMException {
        return (Purchase) BaseObj.findByKey(Purchase.class, _oKey);
    }


}