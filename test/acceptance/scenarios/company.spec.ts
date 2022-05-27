import {AppConn} from "../drivers/app.conn";
import {RestDriver} from "../drivers/rest.driver";
import {clearDB} from "../../tools/database.interactions";
import {CompanyDSL} from "../dsl/company.dsl";


describe('Companies Behavior', () => {
    let restDriver: RestDriver
    let appConn: AppConn
    let companyDSL: CompanyDSL

    beforeAll(async () => {
        appConn = new AppConn(3000)
        await appConn.init()
        restDriver = new RestDriver(appConn)
        companyDSL = new CompanyDSL(restDriver)
    })

    afterEach(async () => {
        await clearDB()
    })

    afterAll(async () => {
        await appConn.stop()
    })

    describe('behaviour of work relation', () => {

        // beforeEach(async () => {
        //
        // })

        it('should add a work relation for a specific company and employee and retrieve it later',
            async () => {
                // Arrange
                const workRelationData = await companyDSL.givenWorkRelation(
                    {registered: false, isActive: true, forEmployee: 'new'}
                )

                // Act
                await companyDSL.registerWorkRelation(workRelationData)
                const workRelation = await companyDSL.retrieveWorkRelation(
                    workRelationData.companyCNPJ,
                    workRelationData.employeeCPF
                )

                // Assert
                companyDSL.assertWorkRelationMatch(workRelation, workRelationData)
        })

        it(
           'should change status of any work relation if active when new active work relation is submitted',
           async () => {
               //Arrange
               const workRelationData1 = await companyDSL.givenWorkRelation()
               const workRelationData2 = await companyDSL.givenWorkRelation(
                   {isActive: true, registered: false, forEmployee: workRelationData1.employeeCPF}
               )

               //Act
               await companyDSL.registerWorkRelation(workRelationData2)

               //Assert
               await companyDSL.assertStatusOfWorkRelation(
                   workRelationData1.companyCNPJ,
                   workRelationData1.employeeCPF,
                   false
               )
               await companyDSL.assertStatusOfWorkRelation(
                   workRelationData2.companyCNPJ,
                   workRelationData2.employeeCPF,
                   true
               )
           })
    })

})