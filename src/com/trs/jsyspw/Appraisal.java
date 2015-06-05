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
 *      class Appraisal ���� Appraisal����Ķ����ʵ��</p>
 * <p>Update Logs:
 *		[1] wangjiang@2014/10/31 10:29:18 ��������
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

    /** �������ͱ�� */
    public final static int     OBJ_TYPE      = 1436904793;

    /** �������ݴ洢�����ݿ��� */
    public final static String  DB_TABLE_NAME = "XWCMAPPRAISAL";

	/** �������ݴ洢��ID�ֶ��� */
    public final static String  DB_ID_NAME    = "APPRAISALID";

    /** ���캯��������Ĭ�Ͻӿ� */
    public Appraisal(){
        super();
    }

//==============================================================================
//���ظ����еĳ���ӿں���

    /**
     * ȡ�������ݴ洢�����ݱ�����
     * @return �������ݴ洢�����ݱ�����
     */
    public String getDbTableName(){
        return DB_TABLE_NAME;
    }

    /**
     * ȡ�������ݴ洢��ID�ֶ���
     * @return  ID�ֶ���
     */
    public String getIdFieldName(){
        return DB_ID_NAME;
    }

    /**
     * ȡ�øö�������ͱ��
     * @return ��������ͱ��
     */
    public int getWCMType(){
        return OBJ_TYPE;
    }

//==============================================================================
//���Զ�д����


 /**
  * ��ȡ���ԣ�Productionname
   * @return  Productionname
   */
  public String getProductionname(){
       return this.getPropertyAsString("PRODUCTIONNAME");   
}

  /**
   * �������ԣ�Productionname
   * @param	_sProductionname ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setProductionname( String _sProductionname ) throws WCMException{
      return this.setProperty("PRODUCTIONNAME", _sProductionname ); 
  }

 /**
  * ��ȡ���ԣ�Productionauthor
   * @return  Productionauthor
   */
  public String getProductionauthor(){
       return this.getPropertyAsString("PRODUCTIONAUTHOR");   
}

  /**
   * �������ԣ�Productionauthor
   * @param	_sProductionauthor ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setProductionauthor( String _sProductionauthor ) throws WCMException{
      return this.setProperty("PRODUCTIONAUTHOR", _sProductionauthor ); 
  }

 /**
  * ��ȡ���ԣ�Productiontype
   * @return  Productiontype
   */
  public String getProductiontype(){
       return this.getPropertyAsString("PRODUCTIONTYPE");   
}

  /**
   * �������ԣ�Productiontype
   * @param	_sProductiontype ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setProductiontype( String _sProductiontype ) throws WCMException{
      return this.setProperty("PRODUCTIONTYPE", _sProductiontype ); 
  }

 /**
  * ��ȡ���ԣ�Owner
   * @return  Owner
   */
  public String getOwner(){
       return this.getPropertyAsString("OWNER");   
}

  /**
   * �������ԣ�Owner
   * @param	_sOwner ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setOwner( String _sOwner ) throws WCMException{
      return this.setProperty("OWNER", _sOwner ); 
  }

 /**
  * ��ȡ���ԣ�Picurl
   * @return  Picurl
   */
  public String getPicurl(){
       return this.getPropertyAsString("PICURL");   
}

  /**
   * �������ԣ�Picurl
   * @param	_sPicurl ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setPicurl( String _sPicurl ) throws WCMException{
      return this.setProperty("PICURL", _sPicurl ); 
  }

 /**
  * ��ȡ���ԣ�ProductDate
   * @return  ProductDate
   */
  public String getProductDate(){
       return this.getPropertyAsString("PRODUCTDATE");   
}

  /**
   * �������ԣ�ProductDate
   * @param	_sProductDate ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setProductDate( String _sProductDate ) throws WCMException{
      return this.setProperty("PRODUCTDATE", _sProductDate ); 
  }

 /**
  * ��ȡ���ԣ�Agent
   * @return  Agent
   */
  public String getAgent(){
       return this.getPropertyAsString("AGENT");   
}

  /**
   * �������ԣ�Agent
   * @param	_sAgent ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setAgent( String _sAgent ) throws WCMException{
      return this.setProperty("AGENT", _sAgent ); 
  }

 /**
  * ��ȡ���ԣ�Introductio
   * @return  Introductio
   */
  public String getIntroductio(){
      CDBText txtValue = (CDBText)getProperty("INTRODUCTIO"); 
      if( txtValue==null ) return null;
      //else 
      return txtValue.getText();  
}

  /**
   * �������ԣ�Introductio
   * @param	_sIntroductio ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setIntroductio( String _sIntroductio ) throws WCMException{
      return this.setProperty("INTRODUCTIO", new CDBText(getDBManager().getDBTypeAsInt(), _sIntroductio)); 
  }

 /**
  * ��ȡ���ԣ�Remarks
   * @return  Remarks
   */
  public String getRemarks(){
      CDBText txtValue = (CDBText)getProperty("REMARKS"); 
      if( txtValue==null ) return null;
      //else 
      return txtValue.getText();  
}

  /**
   * �������ԣ�Remarks
   * @param	_sRemarks ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setRemarks( String _sRemarks ) throws WCMException{
      return this.setProperty("REMARKS", new CDBText(getDBManager().getDBTypeAsInt(), _sRemarks)); 
  }

 /**
  * ��ȡ���ԣ�AgentTel
   * @return  AgentTel
   */
  public String getAgentTel(){
       return this.getPropertyAsString("AGENTTEL");   
}

  /**
   * �������ԣ�AgentTel
   * @param	_sAgentTel ����ֵ
   * @return ��ָ������ֵ��Ч�����������óɹ����򷵻�true�����򷵻�false. 
   * @throws WCMException ����ֵ��Ч������ʧ�ܣ����׳��쳣��
   */
  public boolean setAgentTel( String _sAgentTel ) throws WCMException{
      return this.setProperty("AGENTTEL", _sAgentTel ); 
  }

  /** ���ԣ�CrUser  �����û�
   *  �ɸ���WCMObj�ṩ�ӿ�֧�֡� 
   */

  /** ���ԣ�CrTime ����ʱ��
   *  �ɸ���WCMObj�ṩ�ӿ�֧�֡� 
   */


//==============================================================================
//���ݿ����

    /**
     * �������������Ч��
     * @return ����������������Ч���򷵻�true�����򷵻�false.
     * @throws WCMException  �����������ò�������������ֵ����ȷ��������ظ������׳��쳣��
     */
    public boolean isValid() throws WCMException{
        if( isAddMode() ){
			//���ǿ������Ƿ�����
			
 if( getProperty("PRODUCTIONNAME")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"����Productionnameû������(Appraisal.isValid)"); 
             }
 if( getProperty("PRODUCTIONAUTHOR")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"����Productionauthorû������(Appraisal.isValid)"); 
             }
 if( getProperty("PRODUCTIONTYPE")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"����Productiontypeû������(Appraisal.isValid)"); 
             }
 if( getProperty("OWNER")==null ){ 
                 throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_SET,"����Ownerû������(Appraisal.isValid)"); 
             }
        }
        else{  //�༭ģʽ����������ʱ���Ѿ�����У�飡
            if( ! this.isModified()){
                throw new WCMException( ExceptionNumber.ERR_PROPERTY_NOT_MODIFIED,
					"��������û�и���(Appraisal.isValid)" );
            }
        }//end if

		return true;
    }//END: isValid()


    /**
     * ����������д�����ݿ�
     * @param _currUser  ��ǰ�����û�
     * @throws WCMException  д������ʧ�ܣ����׳��쳣��
     */
    public void insert( User _currUser ) throws WCMException{
        if ( isAddMode() && this.isModified() ){
			//�������Ե�ȱʡֵ
			


            super.insert( _currUser );  //insert into Db
        }//end if
    }

    //==============================================================================
    //�߼�����

    /**
     * ��ȡָ��ID�Ķ���
     * 
     * @param _nId
     *            ָ���Ķ���ID
     * @return ���ҵ�ָ��ID�Ķ����򷵻ض���ʵ�壻���򣬷���null��
     * @throws WCMException
     *             ����ȡ����ʧ�ܣ����׳��쳣��
     */
    public final static Appraisal findById(int _nId) throws WCMException {
        //���ID����Ч��
        if (_nId <= 0) {
            return null;
        }

        //��ȡָ��ID�Ķ���
        return (Appraisal) BaseObj.findById(Appraisal.class, _nId);

    }//END: findById()

    /**
     * ������ǰ����[Appraisal]��ʵ��
     * 
     * @return ��ǰ�����ʵ��[Appraisal]
     * @throws WCMException
     */
    public final static Appraisal createNewInstance() throws WCMException {
        return (Appraisal) BaseObj.createNewInstance(Appraisal.class);
    }

    /**
     * ��ȡָ��������Key�Ķ���
     * 
     * @param _oKey
     *            ָ����������Key
     * @return ���ҵ�������Key�Ķ����򷵻ض���ʵ�壻���򣬷���null��
     * @throws WCMException
     *             ����ȡ����ʧ�ܣ����׳��쳣��
     */
    public final static Appraisal findByKey(Object _oKey) throws WCMException {
        return (Appraisal) BaseObj.findByKey(Appraisal.class, _oKey);
    }


}