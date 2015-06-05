package com.trs.jsyspw;

/**
 * <p>Title:        TRS WCM</p>
 * <p>Copyright:    Copyright (c) 2004</p>
 * <p>Company:      www.trs.com.cn</p>
 * @author			trs wcm
 * @copyright		www.trs.com.cn
 * @created by		XWCMAutoTool 2.12
 * @version			5.2
 *
 * <p>Created:         2015/5/27 17:36:05</p>
 * <p>Last Modified:   2015/5/27 17:51:46</p>
 * <p>Description:
 *      class YUser —— YUser对象的定义和实现</p>
 * <p>Update Logs:
 *		[1] trs wcm@2015/5/27 17:36:05 创建对象
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

public class YUser extends CMSObj{

    /** 对象类型编号 */
    public final static int     OBJ_TYPE      = 35009370;

    /** 对象数据存储的数据库名 */
    public final static String  DB_TABLE_NAME = "XWCMYUSER";

	/** 对象数据存储的ID字段名 */
    public final static String  DB_ID_NAME    = "YUSERID";

    /** 构造函数：保留默认接口 */
    public YUser(){
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
  * 提取属性：Username
   * @return  Username
   */
  public String getUsername(){
       return this.getPropertyAsString("USERNAME");   
}

  /**
   * 设置属性：Username
   * @param	_sUsername 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setUsername( String _sUsername ) throws WCMException{
      return this.setProperty("USERNAME", _sUsername ); 
  }

 /**
  * 提取属性：Password
   * @return  Password
   */
  public String getPassword(){
       return this.getPropertyAsString("PASSWORD");   
}

  /**
   * 设置属性：Password
   * @param	_sPassword 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setPassword( String _sPassword ) throws WCMException{
      return this.setProperty("PASSWORD", _sPassword ); 
  }

 /**
  * 提取属性：Nickname
   * @return  Nickname
   */
  public String getNickname(){
       return this.getPropertyAsString("NICKNAME");   
}

  /**
   * 设置属性：Nickname
   * @param	_sNickname 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setNickname( String _sNickname ) throws WCMException{
      return this.setProperty("NICKNAME", _sNickname ); 
  }

 /**
  * 提取属性：Sex
   * @return  Sex
   */
  public String getSex(){
       return this.getPropertyAsString("SEX");   
}

  /**
   * 设置属性：Sex
   * @param	_sSex 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setSex( String _sSex ) throws WCMException{
      return this.setProperty("SEX", _sSex ); 
  }

 /**
  * 提取属性：Satatus
   * @return  Satatus
   */
  public int getSatatus(){
       return this.getPropertyAsInt("SATATUS",0);   
}

  /**
   * 设置属性：Satatus
   * @param	_nSatatus 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setSatatus( int _nSatatus ) throws WCMException{
      return this.setProperty("SATATUS", _nSatatus ); 
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
			
        }
        else{  //编辑模式，属性设置时，已经做了校验！
            if( ! this.isModified()){
                throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_MODIFIED,
					"对象属性没有更改(YUser.isValid)" );
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
    public final static YUser findById(int _nId) throws WCMException {
        //检测ID的有效性
        if (_nId <= 0) {
            return null;
        }

        //提取指定ID的对象
        return (YUser) BaseObj.findById(YUser.class, _nId);

    }//END: findById()

    /**
     * 产生当前对象[YUser]的实例
     * 
     * @return 当前对象的实例[YUser]
     * @throws WCMException
     */
    public final static YUser createNewInstance() throws WCMException {
        return (YUser) BaseObj.createNewInstance(YUser.class);
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
    public final static YUser findByKey(Object _oKey) throws WCMException {
        return (YUser) BaseObj.findByKey(YUser.class, _oKey);
    }


}