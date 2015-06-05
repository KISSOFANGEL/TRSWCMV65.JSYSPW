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
 * <p>Created:         2014/10/31 10:29:18</p>
 * <p>Last Modified:   2015/6/3 10:13:18</p>
 * <p>Description:
 *      class Appraisal —— Appraisal对象的定义和实现</p>
 * <p>Update Logs:
 *		[1] wangjiang@2014/10/31 10:29:18 创建对象
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

public class Appraisal extends CMSObj{

    /** 对象类型编号 */
    public final static int     OBJ_TYPE      = 1436904793;

    /** 对象数据存储的数据库名 */
    public final static String  DB_TABLE_NAME = "XWCMAPPRAISAL";

	/** 对象数据存储的ID字段名 */
    public final static String  DB_ID_NAME    = "APPRAISALID";

    /** 构造函数：保留默认接口 */
    public Appraisal(){
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
  * 提取属性：Productionname
   * @return  Productionname
   */
  public String getProductionname(){
       return this.getPropertyAsString("PRODUCTIONNAME");   
}

  /**
   * 设置属性：Productionname
   * @param	_sProductionname 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setProductionname( String _sProductionname ) throws WCMException{
      return this.setProperty("PRODUCTIONNAME", _sProductionname ); 
  }

 /**
  * 提取属性：Productionauthor
   * @return  Productionauthor
   */
  public String getProductionauthor(){
       return this.getPropertyAsString("PRODUCTIONAUTHOR");   
}

  /**
   * 设置属性：Productionauthor
   * @param	_sProductionauthor 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setProductionauthor( String _sProductionauthor ) throws WCMException{
      return this.setProperty("PRODUCTIONAUTHOR", _sProductionauthor ); 
  }

 /**
  * 提取属性：Productiontype
   * @return  Productiontype
   */
  public String getProductiontype(){
       return this.getPropertyAsString("PRODUCTIONTYPE");   
}

  /**
   * 设置属性：Productiontype
   * @param	_sProductiontype 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setProductiontype( String _sProductiontype ) throws WCMException{
      return this.setProperty("PRODUCTIONTYPE", _sProductiontype ); 
  }

 /**
  * 提取属性：Owner
   * @return  Owner
   */
  public String getOwner(){
       return this.getPropertyAsString("OWNER");   
}

  /**
   * 设置属性：Owner
   * @param	_sOwner 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setOwner( String _sOwner ) throws WCMException{
      return this.setProperty("OWNER", _sOwner ); 
  }

 /**
  * 提取属性：Picurl
   * @return  Picurl
   */
  public String getPicurl(){
       return this.getPropertyAsString("PICURL");   
}

  /**
   * 设置属性：Picurl
   * @param	_sPicurl 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setPicurl( String _sPicurl ) throws WCMException{
      return this.setProperty("PICURL", _sPicurl ); 
  }

 /**
  * 提取属性：ProductDate
   * @return  ProductDate
   */
  public String getProductDate(){
       return this.getPropertyAsString("PRODUCTDATE");   
}

  /**
   * 设置属性：ProductDate
   * @param	_sProductDate 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setProductDate( String _sProductDate ) throws WCMException{
      return this.setProperty("PRODUCTDATE", _sProductDate ); 
  }

 /**
  * 提取属性：Agent
   * @return  Agent
   */
  public String getAgent(){
       return this.getPropertyAsString("AGENT");   
}

  /**
   * 设置属性：Agent
   * @param	_sAgent 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setAgent( String _sAgent ) throws WCMException{
      return this.setProperty("AGENT", _sAgent ); 
  }

 /**
  * 提取属性：Introductio
   * @return  Introductio
   */
  public String getIntroductio(){
      CDBText txtValue = (CDBText)getProperty("INTRODUCTIO"); 
      if( txtValue==null ) return null;
      //else 
      return txtValue.getText();  
}

  /**
   * 设置属性：Introductio
   * @param	_sIntroductio 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setIntroductio( String _sIntroductio ) throws WCMException{
      return this.setProperty("INTRODUCTIO", new CDBText(getDBManager().getDBTypeAsInt(), _sIntroductio)); 
  }

 /**
  * 提取属性：Remarks
   * @return  Remarks
   */
  public String getRemarks(){
      CDBText txtValue = (CDBText)getProperty("REMARKS"); 
      if( txtValue==null ) return null;
      //else 
      return txtValue.getText();  
}

  /**
   * 设置属性：Remarks
   * @param	_sRemarks 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setRemarks( String _sRemarks ) throws WCMException{
      return this.setProperty("REMARKS", new CDBText(getDBManager().getDBTypeAsInt(), _sRemarks)); 
  }

 /**
  * 提取属性：AgentTel
   * @return  AgentTel
   */
  public String getAgentTel(){
       return this.getPropertyAsString("AGENTTEL");   
}

  /**
   * 设置属性：AgentTel
   * @param	_sAgentTel 属性值
   * @return 若指定属性值有效，且属性设置成功，则返回true；否则返回false. 
   * @throws WCMException 属性值无效或设置失败，会抛出异常。
   */
  public boolean setAgentTel( String _sAgentTel ) throws WCMException{
      return this.setProperty("AGENTTEL", _sAgentTel ); 
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
			
 if( getProperty("PRODUCTIONNAME")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"属性Productionname没有设置(Appraisal.isValid)"); 
             }
 if( getProperty("PRODUCTIONAUTHOR")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"属性Productionauthor没有设置(Appraisal.isValid)"); 
             }
 if( getProperty("PRODUCTIONTYPE")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"属性Productiontype没有设置(Appraisal.isValid)"); 
             }
 if( getProperty("OWNER")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"属性Owner没有设置(Appraisal.isValid)"); 
             }
        }
        else{  //编辑模式，属性设置时，已经做了校验！
            if( ! this.isModified()){
                throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_MODIFIED,
					"对象属性没有更改(Appraisal.isValid)" );
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
    public final static Appraisal findById(int _nId) throws WCMException {
        //检测ID的有效性
        if (_nId <= 0) {
            return null;
        }

        //提取指定ID的对象
        return (Appraisal) BaseObj.findById(Appraisal.class, _nId);

    }//END: findById()

    /**
     * 产生当前对象[Appraisal]的实例
     * 
     * @return 当前对象的实例[Appraisal]
     * @throws WCMException
     */
    public final static Appraisal createNewInstance() throws WCMException {
        return (Appraisal) BaseObj.createNewInstance(Appraisal.class);
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
    public final static Appraisal findByKey(Object _oKey) throws WCMException {
        return (Appraisal) BaseObj.findByKey(Appraisal.class, _oKey);
    }


}